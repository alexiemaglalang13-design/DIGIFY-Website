import React, { useState, useEffect, useMemo } from 'react';
import {
  LayoutDashboard,
  Inbox,
  Package,
  LogOut,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Tag,
  Mail,
  Calendar,
  Trash2,
  Edit3,
  ExternalLink,
  RefreshCw,
  Eye,
  Plus,
  ArrowLeft,
  X,
  Sparkles,
  ChevronDown,
  Check,
  User,
  Shield,
  FileText,
  Send,
  SlidersHorizontal,
} from 'lucide-react';
import { DigifyLogo } from '../components/DigifyLogo';
import { adminApi, Inquiry, AdminUser } from './adminApi';
import { ServiceItem } from '../components/Services';

interface AdminDashboardProps {
  currentUser: AdminUser;
  onLogout: () => void;
  onBackToWebsite: () => void;
  services: ServiceItem[];
  onRefreshServices: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  onLogout,
  onBackToWebsite,
  services,
  onRefreshServices,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inquiries' | 'services'>('dashboard');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Inquiries Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'New' | 'Contacted' | 'Completed'>('All');
  const [serviceFilter, setServiceFilter] = useState<string>('All');

  // Detail Modal / Drawer State
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [detailNotes, setDetailNotes] = useState<string>('');
  const [isSavingNotes, setIsSavingNotes] = useState<boolean>(false);

  // Delete Confirmation Modal
  const [inquiryToDelete, setInquiryToDelete] = useState<Inquiry | null>(null);

  // New Service Modal
  const [showAddServiceModal, setShowAddServiceModal] = useState<boolean>(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState('Website');
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('Custom Quote');
  const [newServiceDeliverables, setNewServiceDeliverables] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load inquiries from backend
  const loadInquiries = async () => {
    setIsRefreshing(true);
    try {
      const data = await adminApi.getInquiries();
      setInquiries(data);
    } catch (err: any) {
      showToast(err.message || 'Failed to fetch inquiries.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  // Update status handler
  const handleStatusChange = async (id: number, newStatus: 'New' | 'Contacted' | 'Completed') => {
    try {
      const updated = await adminApi.updateInquiryStatus(id, newStatus);
      setInquiries((prev) => prev.map((inq) => (inq.id === id ? updated : inq)));
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(updated);
      }
      showToast(`Inquiry marked as "${newStatus}"`);
    } catch (err: any) {
      showToast(err.message || 'Failed to update status.');
    }
  };

  // Save notes handler
  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    setIsSavingNotes(true);
    try {
      const updated = await adminApi.updateInquiryStatus(selectedInquiry.id, selectedInquiry.status, detailNotes);
      setInquiries((prev) => prev.map((inq) => (inq.id === selectedInquiry.id ? updated : inq)));
      setSelectedInquiry(updated);
      showToast('Admin notes updated successfully.');
    } catch (err: any) {
      showToast(err.message || 'Failed to save notes.');
    } finally {
      setIsSavingNotes(false);
    }
  };

  // Confirm delete handler
  const handleDeleteInquiry = async () => {
    if (!inquiryToDelete) return;
    try {
      await adminApi.deleteInquiry(inquiryToDelete.id);
      setInquiries((prev) => prev.filter((inq) => inq.id !== inquiryToDelete.id));
      if (selectedInquiry?.id === inquiryToDelete.id) {
        setSelectedInquiry(null);
      }
      showToast(`Deleted inquiry from "${inquiryToDelete.customerName}"`);
      setInquiryToDelete(null);
    } catch (err: any) {
      showToast(err.message || 'Failed to delete inquiry.');
    }
  };

  // Delete Service Confirmation Modal
  const [serviceToDelete, setServiceToDelete] = useState<ServiceItem | null>(null);

  // Edit Service Modal State
  const [serviceToEdit, setServiceToEdit] = useState<ServiceItem | null>(null);
  const [editServiceName, setEditServiceName] = useState('');
  const [editServiceCategory, setEditServiceCategory] = useState('Website');
  const [editServiceDesc, setEditServiceDesc] = useState('');
  const [editServicePrice, setEditServicePrice] = useState('');
  const [editServiceDeliverables, setEditServiceDeliverables] = useState('');

  // Open Edit Service Modal
  const handleOpenEditService = (service: ServiceItem) => {
    setServiceToEdit(service);
    setEditServiceName(service.name);
    setEditServiceCategory(service.category);
    setEditServiceDesc(service.description);
    setEditServicePrice(service.price);
    setEditServiceDeliverables(service.deliverables ? service.deliverables.join(', ') : '');
  };

  // Save Edited Service
  const handleSaveEditService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceToEdit || !editServiceName.trim() || !editServiceDesc.trim()) return;

    try {
      const deliverablesList = editServiceDeliverables
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      await adminApi.updateService(serviceToEdit.id, {
        name: editServiceName.trim(),
        category: editServiceCategory,
        description: editServiceDesc.trim(),
        price: editServicePrice.trim() || 'Custom Quote',
        deliverables: deliverablesList.length > 0 ? deliverablesList : serviceToEdit.deliverables,
      });

      onRefreshServices();
      setServiceToEdit(null);
      showToast(`Service "${editServiceName}" updated successfully.`);
    } catch (err: any) {
      showToast(err.message || 'Failed to update service.');
    }
  };

  // Confirm Delete Service
  const handleDeleteService = async () => {
    if (!serviceToDelete) return;
    try {
      await adminApi.deleteService(serviceToDelete.id);
      onRefreshServices();
      showToast(`Deleted service "${serviceToDelete.name}".`);
      setServiceToDelete(null);
    } catch (err: any) {
      showToast(err.message || 'Failed to delete service.');
    }
  };

  // Add new service package handler
  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim() || !newServiceDesc.trim()) return;

    try {
      const deliverablesList = newServiceDeliverables
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      await adminApi.addService({
        name: newServiceName,
        category: newServiceCategory,
        description: newServiceDesc,
        price: newServicePrice || 'Custom Quote',
        availability: 'Available',
        deliverables: deliverablesList.length > 0 ? deliverablesList : ['Consultation', 'Delivery'],
      });

      onRefreshServices();
      setShowAddServiceModal(false);
      setNewServiceName('');
      setNewServiceDesc('');
      setNewServiceDeliverables('');
      showToast('New service package added to directory.');
    } catch (err: any) {
      showToast(err.message || 'Failed to add service.');
    }
  };

  // Filtered inquiries calculation
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;
      const matchesService =
        serviceFilter === 'All' || inq.serviceOfInterest.toLowerCase().includes(serviceFilter.toLowerCase());

      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        inq.customerName.toLowerCase().includes(query) ||
        inq.email.toLowerCase().includes(query) ||
        inq.serviceOfInterest.toLowerCase().includes(query) ||
        inq.message.toLowerCase().includes(query) ||
        (inq.promoCode && inq.promoCode.toLowerCase().includes(query));

      return matchesStatus && matchesService && matchesQuery;
    });
  }, [inquiries, searchQuery, statusFilter, serviceFilter]);

  // High-level statistics
  const stats = useMemo(() => {
    const total = inquiries.length;
    const newCount = inquiries.filter((i) => i.status === 'New').length;
    const contactedCount = inquiries.filter((i) => i.status === 'Contacted').length;
    const completedCount = inquiries.filter((i) => i.status === 'Completed').length;
    const starterPromoCount = inquiries.filter(
      (i) => (i.promoCode && i.promoCode.toUpperCase() === 'STARTER20') || i.serviceOfInterest.includes('Starter')
    ).length;

    const promoPercentage = total > 0 ? Math.round((starterPromoCount / total) * 100) : 0;

    return { total, newCount, contactedCount, completedCount, starterPromoCount, promoPercentage };
  }, [inquiries]);

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  const getStatusBadge = (status: 'New' | 'Contacted' | 'Completed') => {
    switch (status) {
      case 'New':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-blue-100 text-blue-800 border border-blue-200 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span>New Inquiry</span>
          </span>
        );
      case 'Contacted':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-amber-100 text-amber-800 border border-amber-200 shadow-xs">
            <Clock className="w-3 h-3 text-amber-700" />
            <span>In Discussion</span>
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-xs">
            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
            <span>Completed</span>
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#061234] text-slate-100 flex flex-col font-sans">
      
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#040f2e]/95 backdrop-blur-md border-b border-sky-400/20 shadow-xl shadow-blue-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand & Admin Badge */}
          <div className="flex items-center gap-4">
            <DigifyLogo size="md" showSubtitle={false} />
            <div className="hidden sm:block h-6 w-px bg-white/20" />
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 bg-blue-950/80 px-2.5 py-1 rounded-md border border-cyan-400/30">
                ADMIN CONSOLE
              </span>
            </div>
          </div>

          {/* Quick Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1 p-1 bg-white/10 rounded-2xl border border-white/15 text-xs backdrop-blur-md">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-white text-blue-700 shadow-md'
                  : 'text-sky-200 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all cursor-pointer relative ${
                activeTab === 'inquiries'
                  ? 'bg-white text-blue-700 shadow-md'
                  : 'text-sky-200 hover:text-white'
              }`}
            >
              <Inbox className="w-4 h-4" />
              <span>Customer Inquiries</span>
              {stats.newCount > 0 && (
                <span className="ml-1 w-5 h-5 rounded-full bg-cyan-400 text-slate-950 text-[11px] font-black flex items-center justify-center">
                  {stats.newCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-white text-blue-700 shadow-md'
                  : 'text-sky-200 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Services & Packages</span>
            </button>
          </nav>

          {/* User Profile & Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToWebsite}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-sky-200 hover:text-white transition-colors border border-white/15"
              title="Return to the public Digify website"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Website</span>
            </button>

            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-950/60 border border-sky-400/20 text-xs">
              <User className="w-3.5 h-3.5 text-cyan-300" />
              <span className="font-semibold text-white">{currentUser.username}</span>
            </div>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-bold transition-colors cursor-pointer"
              title="Sign out of the administrator dashboard"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden px-4 pb-3 flex items-center justify-around border-t border-white/10 pt-2 text-xs">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${
              activeTab === 'dashboard' ? 'bg-white text-blue-700 font-bold' : 'text-sky-200'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg relative ${
              activeTab === 'inquiries' ? 'bg-white text-blue-700 font-bold' : 'text-sky-200'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Inquiries</span>
            {stats.newCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${
              activeTab === 'services' ? 'bg-white text-blue-700 font-bold' : 'text-sky-200'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Services</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* TAB 1: DASHBOARD / OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Header banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sky-400/20">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold">
                  OPERATIONS MONITOR
                </span>
                <h1 className="text-3xl sm:text-4xl font-black font-display text-white">
                  Welcome, {currentUser.displayName}
                </h1>
                <p className="text-sm text-sky-100/80">
                  Real-time inquiry intake, package engagement, and customer lead management.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={loadInquiries}
                  disabled={isRefreshing}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white border border-white/20 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>Refresh Feeds</span>
                </button>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-xs font-bold shadow-lg shadow-blue-600/30"
                >
                  <span>Review Inquiries</span>
                  <Inbox className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Card 1: Total Inquiries */}
              <div className="p-6 rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-xl space-y-3">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase font-mono">
                  <span>TOTAL SUBMISSIONS</span>
                  <Inbox className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-4xl font-black font-display text-slate-900">
                  {stats.total}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Recorded from public Contact form
                </div>
              </div>

              {/* Card 2: New Inquiries */}
              <div className="p-6 rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-xl space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-blue-600" />
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase font-mono">
                  <span>ACTION REQUIRED</span>
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-4xl font-black font-display text-blue-600">
                  {stats.newCount}
                </div>
                <div className="text-xs text-slate-600 font-medium flex items-center gap-1">
                  <span>Unreviewed customer inquiries</span>
                </div>
              </div>

              {/* Card 3: Contacted / In Progress */}
              <div className="p-6 rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-xl space-y-3">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase font-mono">
                  <span>IN DISCUSSION</span>
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div className="text-4xl font-black font-display text-slate-900">
                  {stats.contactedCount}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Proposal or discovery underway
                </div>
              </div>

              {/* Card 4: Promo Users */}
              <div className="p-6 rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-xl space-y-3">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase font-mono">
                  <span>PROMO USERS</span>
                  <Tag className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="text-4xl font-black font-display text-indigo-600">
                  {stats.starterPromoCount}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Claimed Digify Starter Package promotion
                </div>
              </div>
            </div>

            {/* Recent Inquiries Quick Preview */}
            <div className="rounded-3xl bg-white text-slate-900 border border-slate-200 p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black font-display text-slate-900">
                    Latest Customer Inquiries
                  </h2>
                  <p className="text-xs text-slate-500">
                    Immediate review of recent submissions from the Digify website.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 font-mono"
                >
                  View All ({inquiries.length}) →
                </button>
              </div>

              {inquiries.length === 0 ? (
                <div className="text-center py-10 space-y-2 text-slate-400">
                  <Inbox className="w-10 h-10 mx-auto text-slate-300" />
                  <p className="font-semibold text-slate-700">No inquiries recorded yet</p>
                  <p className="text-xs">Submissions through the public Contact form will appear here.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-mono">
                        <th className="pb-3 font-bold">CLIENT NAME</th>
                        <th className="pb-3 font-bold">EMAIL</th>
                        <th className="pb-3 font-bold">SERVICE OF INTEREST</th>
                        <th className="pb-3 font-bold">PROMO CODE</th>
                        <th className="pb-3 font-bold">STATUS</th>
                        <th className="pb-3 font-bold">SUBMITTED</th>
                        <th className="pb-3 font-bold text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {inquiries.slice(0, 5).map((inq) => (
                        <tr key={inq.id} className="hover:bg-blue-50/50 transition-colors">
                          <td className="py-4 font-bold text-slate-900">{inq.customerName}</td>
                          <td className="py-4 font-mono text-slate-600">{inq.email}</td>
                          <td className="py-4 text-slate-700 font-medium">{inq.serviceOfInterest}</td>
                          <td className="py-4 font-mono">
                            {inq.promoCode ? (
                              <span className="px-2 py-0.5 rounded font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                                {inq.promoCode} (20% OFF)
                              </span>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </td>
                          <td className="py-4">{getStatusBadge(inq.status)}</td>
                          <td className="py-4 text-slate-500 font-mono text-[11px]">
                            {formatDate(inq.submittedAt)}
                          </td>
                          <td className="py-4 text-right">
                            <button
                              onClick={() => {
                                setSelectedInquiry(inq);
                                setDetailNotes(inq.notes || '');
                              }}
                              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                            >
                              Inspect Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: CUSTOMER INQUIRIES MANAGEMENT */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Header and Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-sky-400/20">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold">
                  CUSTOMER LEAD INTAKE
                </span>
                <h1 className="text-3xl sm:text-4xl font-black font-display text-white">
                  Customer Inquiries
                </h1>
                <p className="text-sm text-sky-100/80">
                  Review, filter, inspect, and update the status of project inquiries submitted through the Digify website.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={loadInquiries}
                  disabled={isRefreshing}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white border border-white/20 transition-colors cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>Refresh Inquiries</span>
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 sm:p-5 rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-xl space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                
                {/* Search Box (6 cols) */}
                <div className="sm:col-span-6 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by customer name, email, service, or message..."
                    className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors font-medium"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Status Filter (3 cols) */}
                <div className="sm:col-span-3">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                  >
                    <option value="All">All Statuses ({inquiries.length})</option>
                    <option value="New">New ({stats.newCount})</option>
                    <option value="Contacted">In Discussion ({stats.contactedCount})</option>
                    <option value="Completed">Completed ({stats.completedCount})</option>
                  </select>
                </div>

                {/* Service Filter (3 cols) */}
                <div className="sm:col-span-3">
                  <select
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                  >
                    <option value="All">All Service Lines</option>
                    <option value="Web Design">Web Design</option>
                    <option value="Digital Branding">Digital Branding</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Starter">Digital Starter Package</option>
                  </select>
                </div>

              </div>

              {/* Status pill summary buttons */}
              <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {(['All', 'New', 'Contacted', 'Completed'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        statusFilter === st
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st} {st !== 'All' ? `(${inquiries.filter((i) => i.status === st).length})` : `(${inquiries.length})`}
                    </button>
                  ))}
                </div>

                <div className="text-slate-500 font-mono text-[11px]">
                  Showing <strong>{filteredInquiries.length}</strong> inquiries matching criteria
                </div>
              </div>
            </div>

            {/* Inquiries Table Container */}
            <div className="rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-2xl overflow-hidden">
              {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
                  <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
                  <p className="font-bold text-slate-800">Retrieving customer inquiries...</p>
                </div>
              ) : filteredInquiries.length === 0 ? (
                <div className="py-20 px-6 text-center space-y-3">
                  <Inbox className="w-12 h-12 text-slate-300 mx-auto" />
                  <h3 className="text-lg font-black text-slate-900 font-display">No inquiries found</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    {searchQuery || statusFilter !== 'All' || serviceFilter !== 'All'
                      ? 'No inquiries match your current search query or active filters.'
                      : 'There are currently no customer inquiries in the system. Submissions through the Contact form will be displayed here.'}
                  </p>
                  {(searchQuery || statusFilter !== 'All' || serviceFilter !== 'All') && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setStatusFilter('All');
                        setServiceFilter('All');
                      }}
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md cursor-pointer"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono font-bold">
                        <th className="py-3.5 px-4">STATUS</th>
                        <th className="py-3.5 px-4">CUSTOMER NAME</th>
                        <th className="py-3.5 px-4">EMAIL</th>
                        <th className="py-3.5 px-4">SERVICE / PACKAGE</th>
                        <th className="py-3.5 px-4">PREFERRED DATE</th>
                        <th className="py-3.5 px-4">PROMO CODE</th>
                        <th className="py-3.5 px-4">SUBMITTED AT</th>
                        <th className="py-3.5 px-4 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredInquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-blue-50/40 transition-colors group">
                          
                          {/* Status Dropdown */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <select
                              value={inq.status}
                              onChange={(e) => handleStatusChange(inq.id, e.target.value as any)}
                              className="text-xs font-bold font-mono py-1 px-2.5 rounded-lg border border-slate-200 bg-white cursor-pointer shadow-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>

                          {/* Customer Name */}
                          <td className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">
                            {inq.customerName}
                          </td>

                          {/* Email Address */}
                          <td className="py-4 px-4 font-mono text-slate-600 whitespace-nowrap">
                            <a
                              href={`mailto:${inq.email}?subject=DIGIFY Project Consultation: ${encodeURIComponent(inq.serviceOfInterest)}`}
                              className="hover:text-blue-600 hover:underline flex items-center gap-1.5"
                            >
                              <Mail className="w-3.5 h-3.5 text-slate-400" />
                              <span>{inq.email}</span>
                            </a>
                          </td>

                          {/* Service of Interest */}
                          <td className="py-4 px-4 font-medium text-slate-800">
                            <div>{inq.serviceOfInterest}</div>
                            {inq.packageSelected && inq.packageSelected !== inq.serviceOfInterest && (
                              <div className="text-[10px] text-slate-400 font-mono">
                                {inq.packageSelected}
                              </div>
                            )}
                          </td>

                          {/* Preferred Date */}
                          <td className="py-4 px-4 text-slate-600 whitespace-nowrap font-mono text-[11px]">
                            {inq.preferredDate || 'Standard Intake'}
                          </td>

                          {/* Applied Promo Code */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            {inq.promoCode ? (
                              <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 inline-flex items-center gap-1 shadow-xs">
                                <Tag className="w-3 h-3" />
                                <span>{inq.promoCode} (20% OFF)</span>
                              </span>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </td>

                          {/* Submitted Timestamp */}
                          <td className="py-4 px-4 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                            {formatDate(inq.submittedAt)}
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-4 text-right whitespace-nowrap space-x-1.5">
                            <button
                              onClick={() => {
                                setSelectedInquiry(inq);
                                setDetailNotes(inq.notes || '');
                              }}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 transition-colors cursor-pointer"
                              title="View full customer message & parameters"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setInquiryToDelete(inq)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-600 hover:text-white text-slate-400 transition-colors cursor-pointer"
                              title="Delete inquiry record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES & PACKAGES MANAGEMENT */}
        {activeTab === 'services' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sky-400/20">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold">
                  CATALOG & OFFERINGS
                </span>
                <h1 className="text-3xl sm:text-4xl font-black font-display text-white">
                  Services & Packages Management
                </h1>
                <p className="text-sm text-sky-100/80">
                  Manage service information, deliverables, pricing, and create or remove offerings.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAddServiceModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-xs shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Package</span>
                </button>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((svc) => (
                <div
                  key={svc.id}
                  className="rounded-3xl bg-white text-slate-900 border border-slate-200 p-6 sm:p-7 shadow-xl space-y-5 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold">
                        {svc.category} · ID #{svc.id}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEditService(svc)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition-colors cursor-pointer border border-blue-200"
                          title="Edit Service Information"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => setServiceToDelete(svc)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition-colors cursor-pointer border border-rose-200"
                          title="Delete Service"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 font-display">
                      {svc.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {svc.description}
                    </p>
                  </div>

                  {svc.deliverables && (
                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                        DELIVERABLES INCLUDED
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {svc.deliverables.map((d) => (
                          <span
                            key={d}
                            className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block font-bold">CURRENT PRICING</span>
                      <span className="font-bold text-slate-900">{svc.price}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditService(svc)}
                        className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
                      >
                        Edit Service
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* MODAL 1: INQUIRY COMPLETE DETAILS DRAWER */}
      {selectedInquiry && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-w-2xl w-full rounded-3xl bg-white text-slate-900 shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-6 sm:px-8 py-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-mono font-bold text-blue-600 uppercase">
                  INQUIRY RECORD #{selectedInquiry.id}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                  {selectedInquiry.customerName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-slate-700">
              
              {/* Status Change Strip */}
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-blue-800 block">
                    CURRENT INTAKE STATUS
                  </span>
                  <div className="mt-1">{getStatusBadge(selectedInquiry.status)}</div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-500 font-medium">Update to:</span>
                  {(['New', 'Contacted', 'Completed'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedInquiry.id, st)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedInquiry.status === st
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Core Parameters Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">CLIENT EMAIL</span>
                  <div className="font-mono text-slate-900 font-bold text-sm select-all">
                    {selectedInquiry.email}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">SERVICE OF INTEREST</span>
                  <div className="text-slate-900 font-bold text-sm">
                    {selectedInquiry.serviceOfInterest}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">PREFERRED DATE</span>
                  <div className="text-slate-900 font-bold font-mono">
                    {selectedInquiry.preferredDate || 'Standard Intake'}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">APPLIED PROMOTION</span>
                  <div>
                    {selectedInquiry.promoCode ? (
                      <span className="px-2 py-0.5 rounded font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {selectedInquiry.promoCode} (20% OFF Applied)
                      </span>
                    ) : (
                      <span className="text-slate-500 font-mono">Standard Custom Quote</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Customer Project Message */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                  FULL CUSTOMER MESSAGE & SCOPE
                </span>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs leading-relaxed whitespace-pre-wrap font-medium">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Submitted Timestamp */}
              <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Submitted on {formatDate(selectedInquiry.submittedAt)}</span>
              </div>

              {/* Administrator Internal Notes */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                  ADMINISTRATIVE FOLLOW-UP NOTES
                </span>
                <textarea
                  rows={3}
                  value={detailNotes}
                  onChange={(e) => setDetailNotes(e.target.value)}
                  placeholder="Record call logs, proposal values, or client follow-up timeline here..."
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  onClick={handleSaveNotes}
                  disabled={isSavingNotes}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  {isSavingNotes ? 'Saving Notes...' : 'Save Admin Notes'}
                </button>
              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <a
                href={`mailto:${selectedInquiry.email}?subject=DIGIFY Project Consultation: ${encodeURIComponent(selectedInquiry.serviceOfInterest)}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Email Customer Directly</span>
              </a>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors"
              >
                Close Drawer
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: CONFIRM DELETE MODAL */}
      {inquiryToDelete && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-w-md w-full rounded-3xl bg-white text-slate-900 p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto shadow-md">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-black font-display text-slate-900">
                Delete Inquiry Record?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Are you sure you want to permanently delete the inquiry for{' '}
                <strong className="text-slate-900">{inquiryToDelete.customerName}</strong> ({inquiryToDelete.email})? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setInquiryToDelete(null)}
                className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteInquiry}
                className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/30 transition-colors cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD NEW SERVICE PACKAGE */}
      {showAddServiceModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-w-lg w-full rounded-3xl bg-white text-slate-900 shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900 font-display">
                Create New Service Package
              </h3>
              <button
                onClick={() => setShowAddServiceModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateService} className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Package Name</label>
                <input
                  type="text"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  placeholder="e.g. SEO & Analytics Acceleration"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Category</label>
                  <select
                    value={newServiceCategory}
                    onChange={(e) => setNewServiceCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="Website">Website</option>
                    <option value="Identity">Identity</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Bundle">Bundle</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Pricing Label</label>
                  <input
                    type="text"
                    value={newServicePrice}
                    onChange={(e) => setNewServicePrice(e.target.value)}
                    placeholder="Custom Quote or Fixed"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Description</label>
                <textarea
                  rows={3}
                  value={newServiceDesc}
                  onChange={(e) => setNewServiceDesc(e.target.value)}
                  placeholder="Summarize the core business value of this service offering..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">
                  Deliverables (comma separated)
                </label>
                <input
                  type="text"
                  value={newServiceDeliverables}
                  onChange={(e) => setNewServiceDeliverables(e.target.value)}
                  placeholder="Audit Report, Keyword Map, Search Console Setup"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddServiceModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30"
                >
                  Publish Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: EDIT SERVICE PACKAGE MODAL */}
      {serviceToEdit && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="max-w-lg w-full rounded-3xl bg-white text-slate-900 shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-black text-slate-900 font-display">
                  Edit Service Package
                </h3>
              </div>
              <button
                onClick={() => setServiceToEdit(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditService} className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Package Name</label>
                <input
                  type="text"
                  value={editServiceName}
                  onChange={(e) => setEditServiceName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Category</label>
                  <select
                    value={editServiceCategory}
                    onChange={(e) => setEditServiceCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="Website">Website</option>
                    <option value="Identity">Identity</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Bundle">Bundle</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Pricing Label</label>
                  <input
                    type="text"
                    value={editServicePrice}
                    onChange={(e) => setEditServicePrice(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Description</label>
                <textarea
                  rows={3}
                  value={editServiceDesc}
                  onChange={(e) => setEditServiceDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">
                  Deliverables (comma separated)
                </label>
                <input
                  type="text"
                  value={editServiceDeliverables}
                  onChange={(e) => setEditServiceDeliverables(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setServiceToEdit(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: DELETE SERVICE CONFIRMATION */}
      {serviceToDelete && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="max-w-md w-full rounded-3xl bg-white text-slate-900 shadow-2xl border border-slate-200 p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-900 font-display">
                Delete Service Package?
              </h3>
              <p className="text-xs text-slate-600">
                Are you sure you want to delete <strong className="text-slate-900">"{serviceToDelete.name}"</strong>? This will remove the package from the website catalog.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setServiceToDelete(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteService}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/30 cursor-pointer"
              >
                Delete Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-900/95 border border-sky-400/50 text-white shadow-2xl text-xs backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="font-bold text-white tracking-wide">{toastMessage}</span>
        </div>
      )}

    </div>
  );
};
