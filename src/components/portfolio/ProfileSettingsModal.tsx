import React, { useState, useRef } from 'react';
import { useProfile, compressAndResizeImage, splitFullName, DEFAULT_PROFILE } from '../../context/ProfileContext';
import { useCursor } from '../../context/CursorContext';
import { 
  X, 
  Upload, 
  Trash2, 
  Check, 
  RotateCcw, 
  User, 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  Sparkles,
  Eye,
  AlertCircle
} from 'lucide-react';

export const ProfileSettingsModal: React.FC = () => {
  const { 
    profile, 
    updateProfile, 
    resetProfile, 
    isProfileModalOpen, 
    setIsProfileModalOpen 
  } = useProfile();
  
  const { settings } = useCursor();
  const activeColor = settings.color || '#00F0FF';

  // Form local state
  const [formData, setFormData] = useState({
    fullName: profile.fullName,
    birthYear: profile.birthYear,
    university: profile.university,
    major: profile.major,
  });

  // Pending image for Preview step (Requirements 2 & 3)
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isProfileModalOpen) return null;

  // Handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setUploadError('Please select a valid image file (JPG, JPEG, PNG, WEBP).');
      return;
    }

    try {
      // Compress and resize to protect localStorage quota
      const compressedDataUrl = await compressAndResizeImage(file, 640, 0.85);
      setPendingImage(compressedDataUrl);
    } catch (err) {
      console.error(err);
      setUploadError('Could not process selected image. Please try another image.');
    } finally {
      // Clear file input value so user can re-select the same file if desired
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // User confirmed: Use This Image
  const handleConfirmImage = () => {
    if (pendingImage) {
      updateProfile({ avatarUrl: pendingImage });
      setPendingImage(null);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  // User canceled: Cancel Image Preview
  const handleCancelImage = () => {
    setPendingImage(null);
    setUploadError(null);
  };

  // Remove image: Reverts to default photo
  const handleRemoveImage = () => {
    updateProfile({ avatarUrl: DEFAULT_PROFILE.avatarUrl });
    setPendingImage(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // Save all textual fields
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName: formData.fullName.trim() || DEFAULT_PROFILE.fullName,
      birthYear: formData.birthYear.trim() || DEFAULT_PROFILE.birthYear,
      university: formData.university.trim() || DEFAULT_PROFILE.university,
      major: formData.major.trim() || DEFAULT_PROFILE.major,
    });
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsProfileModalOpen(false);
    }, 1200);
  };

  // Reset all to original defaults
  const handleResetAll = () => {
    resetProfile();
    setFormData({
      fullName: DEFAULT_PROFILE.fullName,
      birthYear: DEFAULT_PROFILE.birthYear,
      university: DEFAULT_PROFILE.university,
      major: DEFAULT_PROFILE.major,
    });
    setPendingImage(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // Live preview of dynamic line-splitting in Hero
  const nameSplitPreview = splitFullName(formData.fullName);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-md bg-slate-950/80 animate-in fade-in">
      <div 
        className="relative w-full max-w-2xl rounded-3xl backdrop-blur-2xl bg-slate-900/95 border border-slate-700/80 shadow-2xl p-6 sm:p-8 text-slate-100 my-8 overflow-hidden"
        style={{
          boxShadow: `0 25px 60px rgba(0,0,0,0.9), 0 0 35px ${activeColor}20`,
        }}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center border"
              style={{ 
                backgroundColor: `${activeColor}15`, 
                borderColor: `${activeColor}40`,
                color: activeColor 
              }}
            >
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-sans tracking-tight text-white flex items-center gap-2">
                PROFILE SETTINGS
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  REALTIME SYNC
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Update full name, avatar, university, and academic details across the entire portfolio.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetAll}
              title="Reset profile to defaults"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors"
              aria-label="Reset Profile to Defaults"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors"
              aria-label="Close Profile Settings"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {saveSuccess && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Profile successfully updated and saved across all portfolio sections!</span>
          </div>
        )}

        <form onSubmit={handleSaveProfile} className="mt-6 space-y-6">
          {/* ======================================================== */}
          {/* 1. PROFILE IMAGE UPLOAD & PREVIEW SECTION               */}
          {/* ======================================================== */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" style={{ color: activeColor }} />
                <span>PROFILE IMAGE</span>
              </label>
              <span className="text-[11px] font-mono text-slate-500">
                JPG, JPEG, PNG, WEBP (Auto-fitted)
              </span>
            </div>

            {uploadError && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            {/* If pending preview is active (Requirements 2 & 3) */}
            {pendingImage ? (
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/40 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Eye className="w-4 h-4" />
                    Preview Selected Image
                  </span>
                  <span className="text-[10px] text-slate-400">Review before saving</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Preview container with object-fit: cover */}
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-cyan-400 bg-slate-900 shadow-xl flex-shrink-0">
                    <img
                      src={pendingImage}
                      alt="Upload Preview"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="space-y-2 text-center sm:text-left">
                    <p className="text-xs text-slate-300 leading-relaxed">
                      This photo will replace your current profile avatar and be displayed inside the 3D developer frame in Hero.
                    </p>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                      <button
                        type="button"
                        onClick={handleConfirmImage}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg transition-transform active:scale-95"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Use This Image</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleCancelImage}
                        className="px-4 py-2 rounded-xl text-xs font-mono font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Standard Image Controls (Requirement 2 ASCII Layout) */
              <div className="flex flex-col sm:flex-row items-center gap-5">
                {/* Current Image [ Ảnh hiện tại ] */}
                <div className="relative group w-28 h-28 rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-900 shadow-lg flex-shrink-0">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.fullName}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-slate-950/70 text-[10px] font-mono text-center py-0.5 text-slate-300">
                    Current
                  </div>
                </div>

                {/* Upload & Remove Buttons */}
                <div className="space-y-2.5 w-full sm:w-auto">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* Hidden Native File Input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {/* [ Upload Image ] */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold text-slate-950 shadow-md transition-all hover:opacity-90 active:scale-95"
                      style={{ backgroundColor: activeColor }}
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload Image</span>
                    </button>

                    {/* [ Remove Image ] */}
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-medium text-slate-300 bg-slate-900 hover:bg-rose-950/30 hover:text-rose-300 border border-slate-700 hover:border-rose-500/50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Remove Image</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400">
                    Supports portrait, square, or landscape. Automatically fitted via <code className="text-cyan-400">object-fit: cover</code> without facial distortion.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ======================================================== */}
          {/* 2. TEXT FIELDS (FULL NAME, BIRTH YEAR, UNIVERSITY, MAJOR) */}
          {/* ======================================================== */}
          <div className="space-y-4">
            {/* FULL NAME */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" style={{ color: activeColor }} />
                  FULL NAME (HỌ VÀ TÊN)
                </span>
                <span className="text-[10px] text-slate-500 font-normal">Supports any full name</span>
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. NGUYỄN ĐỖ MINH ANH or NGUYỄN VĂN A"
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:outline-none text-white font-medium text-sm transition-colors"
              />

              {/* Real-time Dynamic Line-Split Preview */}
              <div className="mt-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-slate-400">Hero Layout Preview:</span>
                <div className="text-right font-mono font-bold">
                  {nameSplitPreview.line1 && (
                    <span className="text-white block text-[11px]">{nameSplitPreview.line1}</span>
                  )}
                  <span className="text-[11px]" style={{ color: activeColor }}>
                    {nameSplitPreview.line2}
                  </span>
                </div>
              </div>
            </div>

            {/* 3-COLUMN GRID: BIRTH YEAR, UNIVERSITY, MAJOR */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* BIRTH YEAR */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  BIRTH YEAR
                </label>
                <input
                  type="text"
                  required
                  value={formData.birthYear}
                  onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                  placeholder="2007"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:outline-none text-white text-xs transition-colors"
                />
              </div>

              {/* UNIVERSITY */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  UNIVERSITY
                </label>
                <input
                  type="text"
                  required
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  placeholder="Đại học Lạc Hồng"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:outline-none text-white text-xs transition-colors"
                />
              </div>

              {/* MAJOR */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  MAJOR
                </label>
                <input
                  type="text"
                  required
                  value={formData.major}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                  placeholder="Công nghệ Thông tin"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:outline-none text-white text-xs transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Action Footer Buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(false)}
              className="px-5 py-2.5 rounded-xl text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-mono font-semibold text-slate-950 shadow-xl transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: activeColor }}
            >
              <Check className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
