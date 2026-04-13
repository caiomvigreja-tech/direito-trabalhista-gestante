import React, { useState, useEffect, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, Scale, Calendar, Phone, ClipboardList, 
  Search, Bell, User, LayoutDashboard, Users, 
  Settings, BarChart3, ChevronRight, Menu, X,
  CircleDot, HelpCircle, Download, TrendingUp, AlertCircle,
  CheckCircle2, XCircle, Ghost, Clock, History
} from 'lucide-react';

const COLUMNS = [
  { id: "Lead recebido", title: "Lead Recebido", color: "bg-blue-500" },
  { id: "Vídeo inicial enviado", title: "Vídeo Inicial", color: "bg-indigo-500" },
  { id: "Proposta enviada (áudio)", title: "Proposta Enviada", color: "bg-purple-500" },
  { id: "Aceite confirmado", title: "Aceite Confirmado", color: "bg-emerald-500" },
  { id: "Contrato enviado (ficha + link)", title: "Contrato Enviado", color: "bg-teal-500" },
  { id: "Contrato assinado", title: "Contrato Assinado", color: "bg-green-600" },
  { id: "Solicitação de documentos", title: "Solicitando Docs", color: "bg-amber-500" },
  { id: "Documentação completa", title: "Docs. Completos", color: "bg-cyan-600" },
  
  // Perdas / Arquivados
  { id: "Não qualificada", title: "Não Qualificada", color: "bg-gray-400" },
  { id: "Recusou a proposta", title: "Recusou Proposta", color: "bg-rose-500" },
  { id: "Não responde há 7 dias", title: "Sem Resposta (7d)", color: "bg-orange-400" }
];

interface Lead {
  id: string;
  name: string;
  phone: string;
  status: string;
  survey_step_1: string | null;
  survey_step_2: string | null;
  survey_step_3: string | null;
  notes: string | null;
  created_at: string;
  status_updated_at: string | null;
  deadline_alert: boolean;
}

type Tab = 'leads' | 'contacts' | 'reports' | 'settings';

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('leads');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [tempStatus, setTempStatus] = useState<string | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [monthlyGoal, setMonthlyGoal] = useState<number>(20);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedLead) {
      setTempStatus(selectedLead.status);
      fetchComments(selectedLead.id);
    } else {
      setTempStatus(null);
      setComments([]);
    }
  }, [selectedLead]);

  useEffect(() => {
    document.title = 'CRM Trabalhista - Filipe Cunha';
    
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserEmail(user?.email || null);
    });

    fetchLeads();
    fetchMonthlyGoal();

    const subscription = supabase
      .channel('leads_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => {
        fetchLeads();
      })
      .subscribe();

    return () => { subscription.unsubscribe(); };
  }, []);

  const fetchMonthlyGoal = async () => {
    const { data, error } = await supabase
      .from('crm_settings')
      .select('value')
      .eq('key', 'monthly_goal')
      .single();
    
    if (!error && data) {
      setMonthlyGoal(Number(data.value));
    }
  };

  const updateMonthlyGoal = async (newVal: number) => {
    setMonthlyGoal(newVal);
    setIsEditingGoal(false);
    await supabase.from('crm_settings').upsert({ key: 'monthly_goal', value: newVal });
  };

  const handleExportCSV = () => {
    const headers = ["Nome", "Telefone", "Status", "Tempo de Demissao", "Motivo", "Salario", "Criado em"];
    const rows = leads.map(l => [
      l.name,
      l.phone,
      l.status,
      l.survey_step_1 || "",
      l.survey_step_2 || "",
      l.survey_step_3 || "",
      new Date(l.created_at).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(r => r.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `leads_filipe_cunha_${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setLeads(data.map(l => ({ 
        ...l, 
        status: l.status || "Lead recebido",
        notes: l.notes || "",
        status_updated_at: l.status_updated_at || l.created_at
      })));
    }
    setLoading(false);
  };

  const fetchComments = async (leadId: string) => {
    const { data, error } = await supabase
      .from('lead_comments')
      .select('*')
      .eq('lead_id', leadId)
      .order('created_at', { ascending: false });
    
    if (!error) setComments(data || []);
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !selectedLead) return;
    
    const commentData = {
      lead_id: selectedLead.id,
      content: newComment,
      created_by: userEmail
    };

    const { data, error } = await supabase.from('lead_comments').insert([commentData]).select();
    
    if (!error && data) {
      setComments(prev => [data[0], ...prev]);
      setNewComment("");
    } else {
      alert("Erro ao adicionar nota. Verifique se criou a tabela 'lead_comments'.");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("Excluir esta nota permanentemente?")) return;
    const { error } = await supabase.from('lead_comments').delete().eq('id', commentId);
    if (!error) {
      setComments(prev => prev.filter(c => c.id !== commentId));
    }
  };

  const getTimeInStatus = (updatedAt: string | null) => {
    if (!updatedAt) return "0m";
    const lastUpdate = new Date(updatedAt).getTime();
    const now = new Date().getTime();
    const diffInMs = Math.max(0, now - lastUpdate);
    
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    if (diffInMins < 60) return `${Math.max(1, diffInMins)}m`;

    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    if (diffInHours < 24) return `${diffInHours}h`;

    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return `${diffInDays}d`;
  };

  const handleSaveLeadChanges = async () => {
    if (!selectedLead) return;
    setIsSaving(true);

    const isStatusChanged = tempStatus && tempStatus !== selectedLead.status;
    const updateData: any = {
      status: tempStatus || selectedLead.status
    };

    if (isStatusChanged) {
      updateData.status_updated_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('leads')
      .update(updateData)
      .eq('id', selectedLead.id);

    if (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar alterações. Certifique-se de que rodou o comando SQL sugerido.");
    } else {
      if (isStatusChanged) {
        await supabase.from('lead_history').insert([{
          lead_id: selectedLead.id,
          old_status: selectedLead.status,
          new_status: tempStatus,
          changed_by: userEmail
        }]);
      }

      setLeads(prev => prev.map(l => l.id === selectedLead.id ? { ...l, ...updateData } : l));
      setSelectedLead(null);
    }
    setIsSaving(false);
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead || lead.status === newStatus) return;

    const updateData = { 
      status: newStatus, 
      status_updated_at: new Date().toISOString() 
    };

    const { error } = await supabase.from('leads').update(updateData).eq('id', leadId);
    
    if (error) {
      alert("Erro ao mover lead.");
    } else {
      await supabase.from('lead_history').insert([{
        lead_id: leadId,
        old_status: lead.status,
        new_status: newStatus,
        changed_by: userEmail
      }]);
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, ...updateData } : l));
    }
  };

  const stats = useMemo(() => {
    return {
      total: leads.length,
      active: leads.filter(l => !["Não qualificada", "Recusou a proposta", "Não responde há 7 dias", "Contrato assinado", "Solicitação de documentos", "Documentação completa"].includes(l.status)).length,
      signed: leads.filter(l => ["Contrato assinado", "Solicitação de documentos", "Documentação completa"].includes(l.status)).length,
      docsOk: leads.filter(l => l.status === "Documentação completa").length,
      unqualified: leads.filter(l => l.status === "Não qualificada").length,
      refused: leads.filter(l => l.status === "Recusou a proposta").length,
      ghosted: leads.filter(l => l.status === "Não responde há 7 dias").length
    };
  }, [leads]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/crm/login');
  };

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    updateLeadStatus(draggableId, destination.droppableId);
  };

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.phone.includes(searchTerm)
  );

  const leadsByStatus = COLUMNS.reduce((acc, col) => {
    acc[col.id] = filteredLeads.filter(l => l.status === col.id);
    return acc;
  }, {} as Record<string, Lead[]>);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A44C]"></div>
        <span className="text-sm font-medium text-[#050C3B]">Iniciando CRM de Elite...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans antialiased text-slate-900 border-none">
      {/* Sidebar */}
      <aside className={`
        ${isSidebarOpen ? 'w-64' : 'w-0 lg:w-20'} 
        bg-[#050C3B] text-white transition-all duration-300 flex flex-col z-40 fixed lg:relative h-screen border-r border-white/5 shadow-2xl
      `}>
        <div className="p-6 flex items-center justify-center h-32 overflow-hidden">
          {isSidebarOpen ? (
            <img 
              src="/images/logo-horizontal.png" 
              alt="Filipe Cunha Advocacia" 
              className="max-h-16 w-auto object-contain brightness-0 invert" 
            />
          ) : (
            <Scale className="text-[#C9A44C] h-8 w-8 shrink-0" />
          )}
        </div>

        <nav className="mt-4 flex-1 px-4 space-y-2">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Quadro de Leads" active={activeTab === 'leads'} isOpen={isSidebarOpen} onClick={() => setActiveTab('leads')}/>
          <NavItem icon={<Users size={20}/>} label="Contatos" active={activeTab === 'contacts'} isOpen={isSidebarOpen} onClick={() => setActiveTab('contacts')}/>
          <NavItem icon={<BarChart3 size={20}/>} label="Relatórios" active={activeTab === 'reports'} isOpen={isSidebarOpen} onClick={() => setActiveTab('reports')}/>
          <NavItem icon={<Settings size={20}/>} label="Configurações" active={activeTab === 'settings'} isOpen={isSidebarOpen} onClick={() => setActiveTab('settings')}/>
        </nav>

        <div className="p-4 border-t border-white/10">
          {isSidebarOpen ? (
            <div className="bg-white/5 rounded-xl p-3 flex items-center gap-3 overflow-hidden">
              <div className="h-10 w-10 rounded-full bg-[#C9A44C] flex items-center justify-center text-[#050C3B] font-bold shrink-0 shadow-sm">{userEmail?.[0].toUpperCase() || 'U'}</div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold truncate tracking-tight">{userEmail}</span>
                <span className="text-[10px] text-gray-400 font-medium">Administrador</span>
              </div>
              <button onClick={handleLogout} className="ml-auto text-gray-400 hover:text-white transition-colors" title="Sair"><LogOut size={16} /></button>
            </div>
          ) : (
            <button onClick={handleLogout} className="w-full flex justify-center py-2 text-gray-400 hover:text-white transition-colors"><LogOut size={20} /></button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 shrink-0 shadow-sm z-30">
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-[#C9A44C] rounded-lg transition-all hidden lg:block mr-2">
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#C9A44C] transition-colors" size={18} />
              <input 
                type="text" placeholder="Filtrar leads..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm focus:ring-1 focus:ring-[#C9A44C] focus:bg-white transition-all outline-none"
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center ml-6 min-w-[280px]">
            <div className="flex flex-col flex-1 gap-2 p-3 bg-slate-50/50 rounded-2xl border border-slate-100 shadow-sm transition-all hover:bg-white hover:shadow-md group/goal">
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 group-hover/goal:text-[#C9A44C] transition-colors">
                <span className="flex items-center gap-1.5">
                  <TrendingUp size={12} className="text-emerald-500" /> 
                  META ({new Date().toLocaleString('pt-BR', { month: 'long' }).toUpperCase()})
                </span>
                <div onClick={() => setIsEditingGoal(true)} className="cursor-pointer flex items-center gap-2">
                  {isEditingGoal ? (
                    <input 
                      type="number" 
                      autoFocus
                      className="w-12 bg-white border border-slate-200 rounded px-1 outline-none text-right py-0.5 text-xs shadow-inner"
                      onBlur={(e) => updateMonthlyGoal(Number(e.target.value))}
                      onKeyDown={(e) => e.key === 'Enter' && updateMonthlyGoal(Number((e.target as any).value))}
                    />
                  ) : (
                    <span className="text-[#050C3B] text-sm font-black">{stats.signed} <span className="text-slate-300 mx-0.5 text-xs">/</span> {monthlyGoal}</span>
                  )}
                </div>
              </div>
              <div className="h-2 w-full bg-slate-200/50 rounded-full overflow-hidden border border-white shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                  style={{ width: `${Math.min(100, (stats.signed / monthlyGoal) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-hidden relative bg-[#F8FAFC]">
          {activeTab === 'leads' && (
            <div className="absolute inset-0 flex flex-col">
              <div className="p-8 pb-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 shrink-0 overflow-x-auto lg:overflow-visible">
                <StatCard title="Total Leads" value={stats.total} icon={<Users size={20} />} color="text-blue-600" bg="bg-blue-50"/>
                <StatCard title="Em Andamento" value={stats.active} icon={<TrendingUp size={20} />} color="text-[#C9A44C]" bg="bg-[#C9A44C]/10"/>
                <StatCard title="CONTRATOS ASSINADOS" value={stats.signed} icon={<CheckCircle2 size={24} />} color="text-emerald-700" bg="bg-emerald-100" highlight/>
                <StatCard title="Docs OK" value={stats.docsOk} icon={<ClipboardList size={20} />} color="text-cyan-600" bg="bg-cyan-50" compact/>
                <StatCard title="Não Qualif." value={stats.unqualified} icon={<XCircle size={20} />} color="text-gray-400" bg="bg-gray-50" compact/>
                <StatCard title="Recusou" value={stats.refused} icon={<AlertCircle size={20} />} color="text-rose-600" bg="bg-rose-50" compact/>
                <StatCard title="Sem Resposta" value={stats.ghosted} icon={<Ghost size={20} />} color="text-orange-600" bg="bg-orange-50" compact/>
              </div>

              <div className="flex-1 overflow-x-auto overflow-y-hidden p-8 pt-6 custom-scrollbar">
                <div className="flex gap-6 h-full items-start w-max">
                  <DragDropContext onDragEnd={onDragEnd}>
                    {COLUMNS.map((col) => {
                      const columnLeads = leadsByStatus[col.id] || [];
                      return (
                        <div key={col.id} className="flex flex-col flex-shrink-0 w-80 h-full bg-slate-200/40 rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm">
                          <div className="p-4 bg-white/60 backdrop-blur-sm border-b border-slate-200 shrink-0 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${col.color}`}></div>
                              <h2 className="font-bold text-slate-800 text-xs uppercase tracking-wider">{col.title}</h2>
                            </div>
                            <span className="bg-slate-200 text-slate-600 rounded-lg px-2 py-0.5 text-[10px] font-bold">{columnLeads.length}</span>
                          </div>

                          <Droppable droppableId={col.id}>
                            {(provided, snapshot) => (
                              <div ref={provided.innerRef} {...provided.droppableProps} className={`flex-1 p-3 overflow-y-auto ${snapshot.isDraggingOver ? 'bg-slate-300/30' : ''}`}>
                                {columnLeads.map((lead, index) => {
                                  const timeInStage = getTimeInStatus(lead.status_updated_at);
                                  const isStuck = timeInStage.includes('d') && parseInt(timeInStage) >= 3;
                                  const isNew = lead.status === "Lead recebido" && (!lead.status_updated_at || lead.status_updated_at === lead.created_at);
                                  const isClient = ["Contrato assinado", "Solicitação de documentos", "Documentação completa"].includes(lead.status);

                                  return (
                                    <Draggable key={lead.id} draggableId={lead.id} index={index}>
                                      {(provided, snapshot) => (
                                        <div
                                          ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                          onClick={() => setSelectedLead(lead)}
                                          className={`bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-3 select-none group
                                            ${snapshot.isDragging ? 'shadow-2xl ring-2 ring-[#C9A44C] scale-[1.02]' : 'hover:shadow-md hover:border-[#C9A44C]/30 transition-all cursor-pointer active:cursor-grabbing'}
                                            ${lead.deadline_alert ? 'border-l-4 border-l-amber-500' : ''}
                                            ${isStuck ? 'ring-1 ring-red-100 bg-red-50/10' : ''}
                                          `}
                                        >
                                          <div className="flex flex-col gap-1.5">
                                            <div className="flex justify-between items-start">
                                              <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-sm leading-tight">
                                                  <h3 className="font-bold text-slate-900 group-hover:text-[#050C3B]">{lead.name}</h3>
                                                  {isNew && <span className="text-[8px] font-black bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded uppercase leading-none">Novo</span>}
                                                  {isClient && <span className="text-[8px] font-black bg-emerald-100 text-emerald-600 px-1.5 py-0.5 rounded uppercase leading-none">Cliente</span>}
                                                </div>
                                              </div>
                                              {isStuck && <div className="text-[8px] font-black bg-red-100 text-red-600 px-1 py-0.5 rounded uppercase tracking-tighter">Parado</div>}
                                            </div>
                                            <div className="flex items-center text-[10px] text-slate-400 font-medium gap-3">
                                              <span className="flex items-center gap-1"><Phone size={10} className="text-[#C9A44C]" /> {lead.phone}</span>
                                              <span className={`flex items-center gap-1 ${isStuck ? 'text-red-500 font-bold' : ''}`}>
                                                <Clock size={10} /> {timeInStage}
                                              </span>
                                            </div>
                                            {/* Micro Summary Vertical */}
                                            <div className="flex flex-col gap-1 pt-3 border-t border-slate-50 mt-1">
                                              <div className="flex items-center gap-1.5 text-[9px] text-slate-500 font-medium leading-none">
                                                <Calendar size={8} className="text-[#C9A44C]/60" />
                                                <span className="truncate">{lead.survey_step_1}</span>
                                              </div>
                                              <div className="flex items-center gap-1.5 text-[9px] text-slate-500 font-medium leading-none">
                                                <Scale size={8} className="text-[#C9A44C]/60" />
                                                <span className="truncate">{lead.survey_step_2}</span>
                                              </div>
                                              <div className="flex items-center gap-1.5 text-[9px] text-slate-500 font-medium leading-none">
                                                <TrendingUp size={8} className="text-[#C9A44C]/60" />
                                                <span className="truncate">{lead.survey_step_3}</span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </Draggable>
                                  );
                                })}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </div>
                      );
                    })}
                  </DragDropContext>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="p-8 h-full overflow-y-auto">
              <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-[#050C3B]">Base de Contatos</h2>
                    <p className="text-slate-500">Listagem geral e exportação de dados</p>
                  </div>
                  <button 
                    onClick={handleExportCSV}
                    className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm active:scale-95"
                  >
                    <Download size={18} />
                    Exportar CSV
                  </button>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Nome</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Data de Entrada</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredLeads.map(lead => (
                        <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => setSelectedLead(lead)}>
                          <td className="px-6 py-4 font-semibold text-slate-800">{lead.name}</td>
                          <td className="px-6 py-4 lowercase text-slate-400 italic font-medium">{lead.status}</td>
                          <td className="px-6 py-4 font-medium text-slate-600">{new Date(lead.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="p-8 h-full overflow-y-auto bg-slate-50/50">
              <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-black text-[#050C3B] tracking-tight">Jornada do Cliente</h2>
                  <p className="text-slate-500 font-medium">Análise de conversão e saúde do funil de vendas</p>
                </div>

                {/* Funnel Visual Container */}
                <div className="flex flex-col items-center gap-2">
                  <FunnelSegment 
                    label="leads recebidos" 
                    value={stats.total} 
                    total={stats.total} 
                    color="bg-slate-400" 
                    width="w-[100%]"
                  />
                  <ConversionArrow value={stats.total > 0 ? (leads.filter(l => l.status !== "Lead recebido").length / stats.total * 100).toFixed(0) : 0} />
                  
                  <FunnelSegment 
                    label="interagiram (vídeo/áudio)" 
                    value={leads.filter(l => !["Lead recebido", "Não qualificada", "Não responde há 7 dias"].includes(l.status)).length} 
                    total={stats.total} 
                    color="bg-blue-500" 
                    width="w-[85%]"
                  />
                  <ConversionArrow value={leads.filter(l => !["Lead recebido", "Não qualificada", "Não responde há 7 dias"].includes(l.status)).length > 0 ? (leads.filter(l => ["Aceite confirmado", "Contrato enviado (ficha + link)", "Contrato assinado", "Solicitação de documentos", "Documentação completa"].includes(l.status)).length / leads.filter(l => !["Lead recebido", "Não qualificada", "Não responde há 7 dias"].includes(l.status)).length * 100).toFixed(0) : 0} />

                  <FunnelSegment 
                    label="aceitaram proposta" 
                    value={leads.filter(l => ["Aceite confirmado", "Contrato enviado (ficha + link)", "Contrato assinado", "Solicitação de documentos", "Documentação completa"].includes(l.status)).length} 
                    total={stats.total} 
                    color="bg-indigo-600" 
                    width="w-[70%]"
                  />
                  <ConversionArrow value={leads.filter(l => ["Aceite confirmado", "Contrato enviado (ficha + link)", "Contrato assinado", "Solicitação de documentos", "Documentação completa"].includes(l.status)).length > 0 ? (stats.signed / leads.filter(l => ["Aceite confirmado", "Contrato enviado (ficha + link)", "Contrato assinado", "Solicitação de documentos", "Documentação completa"].includes(l.status)).length * 100).toFixed(0) : 0} />

                  <FunnelSegment 
                    label="contratos assinados" 
                    value={stats.signed} 
                    total={stats.total} 
                    color="bg-emerald-600" 
                    width="w-[55%]"
                    isTarget
                  />
                  <ConversionArrow value={stats.signed > 0 ? (stats.docsOk / stats.signed * 100).toFixed(0) : 0} />

                  <FunnelSegment 
                    label="documentação completa" 
                    value={stats.docsOk} 
                    total={stats.total} 
                    color="bg-cyan-600" 
                    width="w-[40%]"
                  />
                </div>

                {/* Secondary Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Conversão Final</span>
                    <div className="text-3xl font-black text-[#050C3B] mt-1">{stats.total > 0 ? ((stats.signed / stats.total) * 100).toFixed(1) : 0}%</div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Aproveitamento Meta</span>
                    <div className="text-3xl font-black text-emerald-600 mt-1">{((stats.signed / monthlyGoal) * 100).toFixed(0)}%</div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gargalo Principal</span>
                    <div className="text-sm font-bold text-rose-500 mt-2 uppercase tracking-tight">Qualificação de Vídeo</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="bg-[#050C3B] p-8 text-white flex justify-between items-start">
              <div className="overflow-hidden pr-4">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h2 className="text-2xl font-black tracking-tight truncate">{selectedLead.name}</h2>
                  {selectedLead.deadline_alert && <span className="bg-[#C9A44C] text-[#050C3B] text-[10px] font-black px-2 py-0.5 rounded uppercase shrink-0">Prioritário</span>}
                </div>
                <div className="flex items-center gap-4 text-gray-400 text-sm overflow-hidden whitespace-nowrap">
                  <span className="flex items-center gap-1.5 shrink-0"><Clock size={14}/> {getTimeInStatus(selectedLead.status_updated_at)} nesta fase</span>
                  <span className="flex items-center gap-1.5 shrink-0"><History size={14}/> {new Date(selectedLead.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors shrink-0"><X size={24} /></button>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Info Column */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Informações do Lead</h4>
                  <div className="space-y-4">
                    <DetailItem icon={<Phone size={16}/>} label="WhatsApp" value={selectedLead.phone} />
                    <DetailItem icon={<Calendar size={16}/>} label="Demissão" value={selectedLead.survey_step_1 || "Não informado"} />
                    <DetailItem icon={<Scale size={16}/>} label="Motivo Saída" value={selectedLead.survey_step_2 || "Não informado"} />
                    <DetailItem icon={<TrendingUp size={16}/>} label="Salário" value={selectedLead.survey_step_3 || "Não informado"} />
                  </div>
                </div>
                <div className="pt-4">
                  <a 
                    href={`https://wa.me/55${selectedLead.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 hover:brightness-105 transition-all duration-300"
                  >
                    <Phone size={18} /> WhatsApp
                  </a>
                </div>
              </div>

              {/* CRM Logic Column */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Movimentar para</h4>
                  <select 
                    value={tempStatus || selectedLead.status} onChange={(e) => setTempStatus(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-[#050C3B] focus:ring-2 focus:ring-[#C9A44C] outline-none"
                  >
                    {COLUMNS.map(col => <option key={col.id} value={col.id}>{col.title}</option>)}
                  </select>
                </div>
                
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Linha do Tempo de Notas</h4>
                  <div className="space-y-3 max-h-40 overflow-y-auto pr-2 custom-scrollbar mb-4 border-b border-slate-100 pb-2">
                    {comments.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">Nenhum comentário ainda.</p>
                    ) : (
                      comments.map(c => (
                        <div key={c.id} className="bg-slate-50 p-3 rounded-lg border border-slate-100 group/note relative">
                          <p className="text-xs text-slate-700 leading-relaxed font-medium pr-10">{c.content}</p>
                          <div className="flex items-center justify-between mt-2 text-[9px] text-slate-400 font-bold uppercase tracking-tighter">
                            <span>{new Date(c.created_at).toLocaleString('pt-BR', { day:'2-digit', month:'2-digit', hour:'2-digit', minute:'2-digit' })}</span>
                            <span>{c.created_by?.split('@')[0]}</span>
                          </div>
                          
                          {/* Note Actions */}
                          <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover/note:opacity-100 transition-opacity">
                            <button onClick={() => handleDeleteComment(c.id)} className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-white rounded transition-all"><XCircle size={12} /></button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="relative group">
                    <textarea 
                      placeholder="Adicionar nova nota..."
                      value={newComment} onChange={(e) => setNewComment(e.target.value)}
                      className="w-full h-24 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#C9A44C] outline-none resize-none pr-10"
                    />
                    <button 
                      onClick={handleAddComment} disabled={!newComment.trim()}
                      className="absolute bottom-2 right-2 p-2 bg-[#C9A44C] text-[#050C3B] rounded-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-20"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={handleSaveLeadChanges} disabled={isSaving}
                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isSaving ? 'bg-slate-200 text-slate-400' : 'bg-[#050C3B] text-white hover:bg-black'}`}
                  >
                    {isSaving ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-400"></div> : <>Salvar Alterações</>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 10px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 20px; border: 3px solid #F8FAFC; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
}

function StatCard({ title, value, icon, color, bg, compact, highlight }: { title: string, value: number, icon: React.ReactNode, color: string, bg: string, compact?: boolean, highlight?: boolean }) {
  return (
    <div className={`bg-white rounded-2xl border shadow-sm flex items-center group hover:shadow-lg transition-all duration-300 ${highlight ? 'border-emerald-300 ring-4 ring-emerald-500/5 shadow-emerald-100' : 'border-slate-100'} ${compact ? 'p-3 gap-3' : 'p-5 gap-4'}`}>
      <div className={`${bg} ${color} rounded-xl transition-transform group-hover:scale-110 ${compact ? 'p-2.5' : 'p-4'}`}>{icon}</div>
      <div className="overflow-hidden">
        <p className={`font-bold text-slate-400 uppercase tracking-widest mb-0.5 truncate ${highlight ? 'text-[11px]' : 'text-[10px]'}`}>{title}</p>
        <p className={`font-black text-slate-800 tracking-tight leading-none ${highlight ? 'text-2xl' : 'text-xl'}`}>{value}</p>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active, isOpen, onClick }: { icon: React.ReactNode, label: string, active: boolean, isOpen: boolean, onClick: () => void }) {
  return (
    <div onClick={onClick} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${active ? 'bg-[#C9A44C] text-[#050C3B] font-bold shadow-lg shadow-black/small' : 'text-gray-400 hover:bg-white/10 hover:text-white'} ${!isOpen && 'justify-center'}`} title={!isOpen ? label : ''}>
      <span className="shrink-0">{icon}</span>
      {isOpen && <span className="text-sm tracking-wide">{label}</span>}
    </div>
  );
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-start gap-2 group/detail">
      <div className="mt-0.5 text-[#C9A44C] opacity-70 group-hover/detail:opacity-100 transition-opacity shrink-0">{icon}</div>
      <div className="flex flex-col overflow-hidden">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter leading-none mb-1">{label}</span>
        <span className="text-[11px] text-slate-700 font-medium leading-tight line-clamp-2">{value}</span>
      </div>
    </div>
  );
}

function FunnelSegment({ label, value, total, color, width, isTarget }: { label: string, value: number, total: number, color: string, width: string, isTarget?: boolean }) {
  const percentage = total > 0 ? (value / total * 100).toFixed(0) : 0;
  return (
    <div className={`flex flex-col items-center gap-1 ${width}`}>
      <div className={`w-full h-11 ${color} rounded-lg shadow-sm flex items-center justify-between px-6 transition-all duration-700 hover:brightness-105 group relative`}>
        {isTarget && <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.6)]" />}
        <span className="text-[10px] font-black text-white/90 uppercase tracking-[0.15em]">{label}</span>
        <div className="flex items-center gap-3">
          <span className="text-lg font-black text-white">{value}</span>
          <span className="text-[10px] font-bold text-white/50 bg-black/10 px-1.5 py-0.5 rounded italic">{percentage}%</span>
        </div>
      </div>
    </div>
  );
}

function ConversionArrow({ value }: { value: string | number }) {
  return (
    <div className="flex flex-col items-center -my-1 relative z-10">
      <div className="w-0.5 h-6 bg-slate-200" />
      <div className="bg-white border border-slate-100 px-2 py-0.5 rounded-full shadow-sm">
        <span className="text-[9px] font-black text-slate-500">{value}% de retenção</span>
      </div>
      <div className="w-0.5 h-6 bg-slate-200" />
    </div>
  );
}

function MetricItem({ label, value, desc, alert }: { label: string, value: string | number, desc: string, alert?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
      <div className={`text-2xl font-black ${alert ? 'text-rose-500' : 'text-[#050C3B]'}`}>{value}</div>
      <span className="text-[10px] text-slate-400 font-medium">{desc}</span>
    </div>
  );
}
