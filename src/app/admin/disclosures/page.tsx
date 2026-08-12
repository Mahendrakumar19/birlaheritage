"use client";

import { useState, useEffect, useCallback } from "react";
import { adminApi } from "@/lib/adminApi";
import AdminModal, { ConfirmDialog } from "@/components/admin/AdminModal";
import AdminToast, { useToast } from "@/components/admin/AdminToast";

interface Disclosure {
  _id: string;
  title: string;
  pdfUrl: string;
  order: number;
  createdAt: string;
}

const DEFAULT_TITLES = [
  "NOC",
  "Trust Certificate",
  "Recognition Certificate",
  "Water Sample Test Report",
  "Mandatory Public Disclosure",
  "Grant Letter",
  "Fire Certificate",
  "Building Safety Certificate",
  "Water Health and Sanitation Certificate",
  "PTA",
  "School Managing Committee",
  "Academic Calender",
  "Self Certificate",
  "Fee structure",
];

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AdminDisclosuresPage() {
  const toast = useToast();
  const [items, setItems] = useState<Disclosure[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Form state
  const [editId, setEditId] = useState<string | null>(null);
  const [titleOption, setTitleOption] = useState<string>("NOC");
  const [customTitle, setCustomTitle] = useState<string>("");
  const [order, setOrder] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);

  // Delete state
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const res = await adminApi.disclosures.list();
    if (res.ok) {
      setItems(Array.isArray(res.data) ? res.data as Disclosure[] : []);
    } else {
      toast.error("Failed to load disclosures");
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const openCreate = () => { 
    setEditId(null);
    setTitleOption("NOC");
    setCustomTitle("");
    setOrder(0);
    setFile(null);
    setIsEdit(false); 
    setModalOpen(true); 
  };
  
  const openEdit = (item: Disclosure) => { 
    setEditId(item._id);
    if (DEFAULT_TITLES.includes(item.title)) {
      setTitleOption(item.title);
      setCustomTitle("");
    } else {
      setTitleOption("Other");
      setCustomTitle(item.title);
    }
    setOrder(item.order);
    setFile(null);
    setIsEdit(true); 
    setModalOpen(true); 
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalTitle = titleOption === "Other" ? customTitle.trim() : titleOption;
    
    if (!finalTitle) { toast.error("Title is required"); return; }
    if (!isEdit && !file) { toast.error("PDF file is required"); return; }
    
    setSaving(true);
    
    const formData = new FormData();
    formData.append("title", finalTitle);
    formData.append("order", String(order));
    if (file) {
      formData.append("pdf", file);
    }

    const res = isEdit && editId
      ? await adminApi.disclosures.update(editId, formData)
      : await adminApi.disclosures.create(formData);
      
    setSaving(false);
    
    if (res.ok) {
      toast.success(isEdit ? "Disclosure updated" : "Disclosure created");
      setModalOpen(false);
      fetchItems();
    } else {
      toast.error((res as { ok: false; message: string }).message);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const res = await adminApi.disclosures.delete(deleteId);
    setDeleting(false);
    if (res.ok) { 
      toast.success("Disclosure deleted"); 
      setDeleteId(null); 
      fetchItems(); 
    } else {
      toast.error((res as { ok: false; message: string }).message);
    }
  };

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      {children}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Mandatory Disclosures</h1>
          <p className="text-sm text-gray-500 mt-1">Manage PDF documents for mandatory disclosure</p>
        </div>
        <button
          onClick={openCreate}
          className="bg-[#003262] text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md shadow-[#003262]/20 hover:bg-[#002244] hover:shadow-lg transition-all flex items-center gap-2 shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Document
        </button>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Date Added</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-400">Loading...</td></tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <p className="text-gray-500 font-medium">No documents found</p>
                    <p className="text-xs text-gray-400 mt-1">Click "Add Document" to upload one.</p>
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900 flex items-center gap-2">
                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                        {item.title}
                      </div>
                      <a href={`${BACKEND_URL}${item.pdfUrl}`} target="_blank" rel="noreferrer" className="text-xs text-[#003262] hover:underline mt-1 inline-block">View PDF</a>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{item.order}</td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEdit(item)} className="p-2 text-gray-400 hover:text-[#003262] hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </button>
                        <button onClick={() => setDeleteId(item._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={isEdit ? "Edit Document" : "Add Document"}>
        <form onSubmit={handleSave} className="space-y-5">
          <Field label="Document Title">
            <select
              value={titleOption}
              onChange={(e) => setTitleOption(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003262]/20 focus:border-[#003262] outline-none text-sm transition-all"
            >
              {DEFAULT_TITLES.map(title => (
                <option key={title} value={title}>{title}</option>
              ))}
              <option value="Other">Other (Custom Name)</option>
            </select>
          </Field>
          
          {titleOption === "Other" && (
            <Field label="Custom Title">
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="Enter custom title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003262]/20 focus:border-[#003262] outline-none text-sm transition-all"
                required
              />
            </Field>
          )}

          <Field label="Display Order">
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              placeholder="e.g. 1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003262]/20 focus:border-[#003262] outline-none text-sm transition-all"
            />
          </Field>

          <Field label={isEdit ? "Update PDF File (optional)" : "Upload PDF File"}>
            <div className="space-y-2">
              <input
                id="disclosure-pdf"
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) => {
                  const selectedFile = e.currentTarget.files?.[0] ?? null;

                  console.log("PDF SELECTED:", selectedFile);
                  console.log("PDF NAME:", selectedFile?.name);
                  console.log("PDF SIZE:", selectedFile?.size);

                  setFile(selectedFile);
                }}
                className="block w-full text-sm"
    
              />

              {file && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm">
                  <div className="font-semibold text-green-800">
                    File selected
                  </div>
                  <div className="text-green-700">
                    {file.name}
                  </div>
                  <div className="text-green-600 text-xs">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
              )}
            </div>
          </Field>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="px-5 py-2 text-sm font-semibold text-white bg-[#003262] rounded-lg hover:bg-[#002244] shadow-sm disabled:opacity-50 transition-all">
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Document"
        message="Are you sure you want to delete this document? This action cannot be undone."
        confirmLabel="Delete"
        danger
        loading={deleting}
      />
      <AdminToast toasts={toast.toasts} onDismiss={toast.dismiss} />
    </div>
  );
}
