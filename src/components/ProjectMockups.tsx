import React, { useState } from 'react';
import {
  BarChart3,
  Users,
  Award,
  CheckCircle2,
  Filter,
  FileText,
  Search,
  Upload,
  FolderOpen,
  ArrowRight,
  TrendingUp,
  Download,
  Eye,
  Check,
} from 'lucide-react';

export const PlacementReadinessMockup: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<'All' | 'CSE' | 'ECE' | 'IT'>('CSE');

  // Dynamic metrics based on selected filter
  const metrics = {
    All: { total: 420, placementRate: '75.2%', avgAptitude: '76.8%', avgTech: '79.4%', attendance: '88.1%' },
    CSE: { total: 180, placementRate: '82.4%', avgAptitude: '81.5%', avgTech: '85.2%', attendance: '91.4%' },
    ECE: { total: 140, placementRate: '71.0%', avgAptitude: '74.2%', avgTech: '75.8%', attendance: '86.0%' },
    IT: { total: 100, placementRate: '74.6%', avgAptitude: '77.0%', avgTech: '80.1%', attendance: '87.5%' },
  }[selectedDept];

  return (
    <div className="w-full bg-[#0a0d18] border border-violet-500/25 rounded-xl overflow-hidden shadow-2xl font-sans">
      {/* Power BI Styled Window Top Bar */}
      <div className="flex flex-wrap items-center justify-between px-3 sm:px-4 py-2 bg-[#0d1222] border-b border-white/10 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="text-xs font-semibold text-slate-200 tracking-wide flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-violet-400" />
            Power BI Desktop • Placement_Readiness_Model.pbix
          </span>
        </div>

        {/* Department Filter Controls */}
        <div className="flex items-center gap-1 bg-[#13192c] p-0.5 rounded-lg border border-white/5">
          <span className="text-[10px] text-slate-400 px-1.5 flex items-center gap-1">
            <Filter className="w-3 h-3 text-cyan-400" /> Branch:
          </span>
          {(['All', 'CSE', 'ECE', 'IT'] as const).map((dept) => (
            <button
              key={dept}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedDept(dept);
              }}
              className={`px-2 py-0.5 text-[11px] font-medium rounded transition-all ${
                selectedDept === dept
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Main Dashboard Canvas */}
      <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
        {/* KPI Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          <div className="bg-[#11162a]/90 p-2.5 rounded-lg border border-violet-500/20">
            <div className="text-[10px] text-slate-400 flex items-center justify-between">
              Total Cohort
              <Users className="w-3 h-3 text-violet-400" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-white font-mono mt-0.5 tabular-nums">
              {metrics.total}
            </div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-0.5 mt-0.5">
              <TrendingUp className="w-2.5 h-2.5" /> 100% evaluated
            </div>
          </div>

          <div className="bg-[#11162a]/90 p-2.5 rounded-lg border border-cyan-500/20">
            <div className="text-[10px] text-slate-400 flex items-center justify-between">
              Placement Readiness
              <Award className="w-3 h-3 text-cyan-400" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-white font-mono mt-0.5 tabular-nums">
              {metrics.placementRate}
            </div>
            <div className="text-[10px] text-cyan-300">Target benchmark: 70%</div>
          </div>

          <div className="bg-[#11162a]/90 p-2.5 rounded-lg border border-indigo-500/20">
            <div className="text-[10px] text-slate-400 flex items-center justify-between">
              Avg Aptitude
              <CheckCircle2 className="w-3 h-3 text-indigo-400" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-white font-mono mt-0.5 tabular-nums">
              {metrics.avgAptitude}
            </div>
            <div className="text-[10px] text-indigo-300">Quant & Logical</div>
          </div>

          <div className="bg-[#11162a]/90 p-2.5 rounded-lg border border-fuchsia-500/20">
            <div className="text-[10px] text-slate-400 flex items-center justify-between">
              Technical Score
              <BarChart3 className="w-3 h-3 text-fuchsia-400" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-white font-mono mt-0.5 tabular-nums">
              {metrics.avgTech}
            </div>
            <div className="text-[10px] text-fuchsia-300">Python/Java/SQL</div>
          </div>
        </div>

        {/* Charts Simulation Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Skill Breakdown Chart */}
          <div className="bg-[#101426] p-3 rounded-lg border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-slate-300">
              <span>Skill Category Performance ({selectedDept})</span>
              <span className="text-[10px] text-violet-400 font-mono">SQL Aggregated</span>
            </div>

            <div className="space-y-1.5 pt-1">
              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                  <span>Programming (Python/SQL)</span>
                  <span className="font-mono text-cyan-400">{metrics.avgTech}</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
                    style={{ width: metrics.avgTech }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                  <span>Aptitude & Problem Solving</span>
                  <span className="font-mono text-violet-400">{metrics.avgAptitude}</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-violet-500 to-purple-500 h-full rounded-full transition-all duration-500"
                    style={{ width: metrics.avgAptitude }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                  <span>Attendance Regularity</span>
                  <span className="font-mono text-emerald-400">{metrics.attendance}</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500"
                    style={{ width: metrics.attendance }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Placement Cohort Distribution */}
          <div className="bg-[#101426] p-3 rounded-lg border border-white/5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-medium text-slate-300">
              <span>Readiness Distribution</span>
              <span className="text-[10px] text-cyan-400 font-mono">DAX Calculated</span>
            </div>

            <div className="grid grid-cols-3 gap-2 my-2 text-center">
              <div className="bg-emerald-950/30 border border-emerald-500/20 p-2 rounded">
                <div className="text-xs font-bold text-emerald-400 font-mono">High Ready</div>
                <div className="text-[11px] text-slate-300 mt-0.5">62% Cohort</div>
              </div>
              <div className="bg-amber-950/30 border border-amber-500/20 p-2 rounded">
                <div className="text-xs font-bold text-amber-400 font-mono">Near Ready</div>
                <div className="text-[11px] text-slate-300 mt-0.5">24% Cohort</div>
              </div>
              <div className="bg-rose-950/30 border border-rose-500/20 p-2 rounded">
                <div className="text-xs font-bold text-rose-400 font-mono">Skill Gap</div>
                <div className="text-[11px] text-slate-300 mt-0.5">14% Cohort</div>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-white/5">
              <span>Interactive Power BI DAX Measures</span>
              <span className="text-violet-400">Live filter active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const StudyShareHubMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const mockNotes = [
    {
      id: '1',
      title: 'Python Scripting & Data Structures Guide',
      subject: 'Python / DSA',
      semester: 'Sem 4',
      size: '2.4 MB',
      downloads: 142,
    },
    {
      id: '2',
      title: 'Database Systems & SQL Join Optimization',
      subject: 'DBMS',
      semester: 'Sem 5',
      size: '3.1 MB',
      downloads: 189,
    },
    {
      id: '3',
      title: 'Operating Systems - Process Scheduling & Memory',
      subject: 'OS',
      semester: 'Sem 4',
      size: '1.8 MB',
      downloads: 110,
    },
  ];

  const handleDownloadClick = (title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloadNotice(title);
    setTimeout(() => setDownloadNotice(null), 2500);
  };

  const filteredNotes = mockNotes.filter((note) => {
    const matchesTab = activeTab === 'All' || note.subject.includes(activeTab);
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="w-full bg-[#0a0e1c] border border-cyan-500/25 rounded-xl overflow-hidden shadow-2xl font-sans">
      {/* App Header Bar */}
      <div className="flex flex-wrap items-center justify-between px-3 sm:px-4 py-2.5 bg-[#0e1428] border-b border-white/10 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          <span className="text-xs font-semibold text-slate-100 flex items-center gap-1.5">
            <FolderOpen className="w-3.5 h-3.5 text-cyan-400" />
            Study Share Hub • MERN Stack Platform
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
            Auth: Student Active
          </span>
        </div>
      </div>

      {/* Search & Tabs */}
      <div className="p-3 sm:p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search notes, subjects, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#11172f] border border-white/10 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-[#121932] p-1 rounded-lg border border-white/5 overflow-x-auto">
            {['All', 'Python', 'DBMS', 'OS'].map((tab) => (
              <button
                key={tab}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab(tab);
                }}
                className={`px-2.5 py-1 text-[11px] font-medium rounded whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Download notification */}
        {downloadNotice && (
          <div className="text-[11px] bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 p-2 rounded flex items-center gap-1.5 animate-in fade-in">
            <Check className="w-3.5 h-3.5 text-cyan-400" />
            Ready: {downloadNotice}
          </div>
        )}

        {/* Note Cards List */}
        <div className="space-y-2">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="flex items-center justify-between p-2.5 bg-[#101730] hover:bg-[#151f40] border border-white/5 hover:border-cyan-500/30 rounded-lg transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-200 group-hover:text-cyan-300 transition-colors">
                    {note.title}
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>{note.subject}</span>
                    <span>•</span>
                    <span>{note.semester}</span>
                    <span>•</span>
                    <span>{note.size}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleDownloadClick(note.title, e)}
                  className="px-2.5 py-1 text-[11px] bg-white/5 hover:bg-cyan-600 text-slate-300 hover:text-white rounded border border-white/10 hover:border-cyan-500 transition-colors flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span className="hidden sm:inline">Preview</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar summary */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-slate-500">
          <span>MongoDB Collections: Users • Subjects • Notes</span>
          <span className="text-cyan-400 font-mono">REST API Active</span>
        </div>
      </div>
    </div>
  );
};
