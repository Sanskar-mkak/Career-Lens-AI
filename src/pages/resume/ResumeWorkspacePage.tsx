/**
 * CareerLens AI — Resume Workspace Page
 *
 * Phase 5: Frontend Resume Workspace UI
 * Allows the user to select, manage, and review their resume before proceeding to Analysis.
 * Frontend UI only; no server uploads, parsing, or fake scoring.
 *
 * Visual Reference: Website Look/Resume Workspace.png
 */

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  X,
  Search,
  TrendingUp,
  Sparkles,
  Lock,
  Lightbulb,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { MascotCanvas } from '@/mascot';
import { ROUTES } from '@/app/routes/routes';
import styles from './ResumeWorkspacePage.module.css';

/* ------------------------------------------------------------------ */
/* Types & Constants                                                  */
/* ------------------------------------------------------------------ */

interface SelectedFileInfo {
  name: string;
  size: number;
  type: string;
  formattedSize: string;
}

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export const ResumeWorkspacePage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<SelectedFileInfo | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  /* ---- File Validation & Selection ---- */

  const handleProcessFile = (file: File) => {
    setErrorMessage(null);

    // Validate extension
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      setErrorMessage(
        `Unsupported file type "${ext}". Please upload a PDF, DOC, or DOCX document.`
      );
      return;
    }

    // Validate size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMessage('File size exceeds the 10 MB limit. Please select a smaller document.');
      return;
    }

    setSelectedFile({
      name: file.name,
      size: file.size,
      type: file.type || 'Document',
      formattedSize: formatFileSize(file.size),
    });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleProcessFile(files[0]);
    }
  };

  /* ---- Drag and Drop Handlers ---- */

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  /* ---- Resume Actions ---- */

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTriggerPicker = () => {
    fileInputRef.current?.click();
  };

  const handleStartAnalysis = () => {
    if (!selectedFile) return;
    // Navigate to the existing Resume Analysis placeholder page
    navigate(ROUTES.RESUME_ANALYSIS);
  };

  return (
    <div className={styles.pageContainer}>
      {/* ── Section 1: Hero Header Banner ── */}
      <section className={styles.heroBanner} aria-label="Resume Intelligence Overview">
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>Resume Intelligence</span>
          <h1 className={styles.heroHeadline}>Upload Your Resume</h1>
          <p className={styles.heroSubtitle}>
            Get AI-powered insights, ATS compatibility checks, and make your resume standout.
          </p>
        </div>

        {/* Mascot Container (Visual footprint matching Resume Workspace.png) */}
        <div className={styles.heroMascotArea} aria-hidden="true">
          <div className={styles.speechBubble}>
            Upload your resume and <span className={styles.speechBubbleText}>make it stronger!</span>
          </div>
          <div className={styles.mascotCanvasBox}>
            <MascotCanvas
              semanticState={selectedFile ? 'SUCCESS' : 'CURIOUS'}
              cameraPreset="compact"
              width="180px"
              height="180px"
              showPlatform={false}
              interactive={true}
              enableMouseOrbit={true}
            />
          </div>
        </div>
      </section>

      {/* ── Section 2: Stepper Progress ── */}
      <nav className={styles.stepperRow} aria-label="Analysis progress steps">
        <div className={`${styles.stepItem} ${styles.stepItemActive}`}>
          <div className={`${styles.stepBadge} ${styles.stepBadgeActive}`}>1</div>
          <span>Upload</span>
        </div>
        <div className={styles.stepLine} aria-hidden="true" />

        <div className={styles.stepItem}>
          <div className={styles.stepBadge}>2</div>
          <span>Review</span>
        </div>
        <div className={styles.stepLine} aria-hidden="true" />

        <div className={styles.stepItem}>
          <div className={styles.stepBadge}>3</div>
          <span>Analyze</span>
        </div>
        <div className={styles.stepLine} aria-hidden="true" />

        <div className={styles.stepItem}>
          <div className={styles.stepBadge}>4</div>
          <span>Results</span>
        </div>
      </nav>

      {/* Error Alert (if file validation fails) */}
      {errorMessage && (
        <div className={styles.errorAlert} role="alert">
          <AlertCircle size={18} aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* ── Section 3: Main Two-Column Grid (Upload & Preview) ── */}
      <div className={styles.workspaceGrid}>
        {/* Left Column: Dropzone & Tips */}
        <div className={styles.leftColumn}>
          {/* Upload Dropzone */}
          <div
            className={`${styles.dropzoneCard} ${isDragging ? styles.dropzoneDragging : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleTriggerPicker}
            role="button"
            tabIndex={0}
            aria-label="Upload resume file dropzone. Click to browse or drag and drop your file."
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleTriggerPicker();
              }
            }}
          >
            <div className={styles.dropzoneIconWrapper} aria-hidden="true">
              <UploadCloud size={32} />
            </div>

            <div>
              <h2 className={styles.dropzoneTitle}>Drag & drop your resume here</h2>
              <p className={styles.dropzoneSubtitle}>or click anywhere to browse files</p>
            </div>

            <button
              type="button"
              className={styles.chooseFileBtn}
              onClick={(e) => {
                e.stopPropagation();
                handleTriggerPicker();
              }}
            >
              Choose File
            </button>

            <p className={styles.dropzoneSupportText}>
              Supports PDF, DOC, DOCX (Max 10 MB)
            </p>

            {/* Hidden native input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className={styles.hiddenFileInput}
              onChange={handleFileInputChange}
              aria-label="Upload resume file"
            />
          </div>

          {/* Tips for a Better Analysis Card */}
          <div className={styles.tipsCard}>
            <div className={styles.tipsHeader}>
              <Lightbulb size={20} className={styles.tipsIcon} aria-hidden="true" />
              <h3 className={styles.tipsTitle}>Tips for a Better Analysis</h3>
            </div>

            <ul className={styles.tipsList}>
              <li className={styles.tipItem}>
                <CheckCircle2 size={16} className={styles.tipCheck} aria-hidden="true" />
                <span>Use a clear, updated resume (PDF preferred)</span>
              </li>
              <li className={styles.tipItem}>
                <CheckCircle2 size={16} className={styles.tipCheck} aria-hidden="true" />
                <span>Include your latest projects and technical competencies</span>
              </li>
              <li className={styles.tipItem}>
                <CheckCircle2 size={16} className={styles.tipCheck} aria-hidden="true" />
                <span>Mention relevant work experience, roles, or internships</span>
              </li>
              <li className={styles.tipItem}>
                <CheckCircle2 size={16} className={styles.tipCheck} aria-hidden="true" />
                <span>Keep the formatting clean, structured, and professional</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Resume Preview */}
        <div className={styles.previewCard}>
          <div className={styles.previewHeader}>
            <h3 className={styles.previewTitle}>Your Resume Preview</h3>
          </div>

          {selectedFile ? (
            <>
              {/* Selected File Metadata Banner */}
              <div className={styles.selectedFileInfo} role="region" aria-label="Selected file details">
                <div className={styles.fileIconAndMeta}>
                  <div className={styles.fileIconBadge} aria-hidden="true">
                    PDF
                  </div>
                  <div className={styles.fileTextMeta}>
                    <span className={styles.fileName} title={selectedFile.name}>
                      {selectedFile.name}
                    </span>
                    <span className={styles.fileSize}>{selectedFile.formattedSize}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className={styles.removeFileBtn}
                  aria-label="Remove selected resume"
                  title="Remove file"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Document Paper Mockup (Visual preview representation matching reference) */}
              <div className={styles.documentMockup} aria-hidden="true">
                <div className={styles.mockupHeader}>
                  <div className={styles.mockupName}>
                    {selectedFile.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')}
                  </div>
                  <div className={styles.mockupContactLines} />
                </div>

                <div className={styles.mockupGrid}>
                  <div className={styles.mockupSection}>
                    <div className={styles.mockupSectionTitle}>Education</div>
                    <div className={styles.mockupLine} />
                    <div className={`${styles.mockupLine} ${styles.mockupLineShort}`} />
                  </div>

                  <div className={styles.mockupSection}>
                    <div className={styles.mockupSectionTitle}>Technical Skills</div>
                    <div className={styles.mockupLine} />
                    <div className={`${styles.mockupLine} ${styles.mockupLineMedium}`} />
                  </div>
                </div>

                <div className={styles.mockupSection}>
                  <div className={styles.mockupSectionTitle}>Experience & Projects</div>
                  <div className={styles.mockupLine} />
                  <div className={`${styles.mockupLine} ${styles.mockupLineMedium}`} />
                  <div className={`${styles.mockupLine} ${styles.mockupLineShort}`} />
                </div>

                <div className={styles.mockupSection}>
                  <div className={styles.mockupSectionTitle}>Achievements</div>
                  <div className={styles.mockupLine} />
                  <div className={`${styles.mockupLine} ${styles.mockupLineShort}`} />
                </div>
              </div>

              {/* Preview Actions */}
              <div className={styles.previewActions}>
                <button
                  type="button"
                  className={styles.viewFullBtn}
                  onClick={handleTriggerPicker}
                  aria-label="Replace current resume file"
                >
                  <span>Replace Resume</span>
                </button>
              </div>
            </>
          ) : (
            /* Empty Preview State */
            <div className={styles.emptyPreviewBox}>
              <FileText size={36} className={styles.emptyPreviewIcon} aria-hidden="true" />
              <h4 className={styles.emptyPreviewTitle}>No resume selected yet</h4>
              <p className={styles.emptyPreviewDesc}>
                Upload or drop your resume on the left to preview your document and unlock
                analysis.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Section 4: What Happens Next / Workflow ── */}
      <section className={styles.workflowSection} aria-label="Analysis process overview">
        <h2 className={styles.workflowHeaderTitle}>What Happens Next?</h2>

        <div className={styles.workflowStepsRow}>
          <div className={styles.workflowStepCard}>
            <div className={styles.workflowStepIconWrapper} aria-hidden="true">
              <FileText size={18} />
            </div>
            <span className={styles.workflowStepText}>
              1. We extract key information & formatting
            </span>
          </div>

          <div className={styles.workflowStepCard}>
            <div className={styles.workflowStepIconWrapper} aria-hidden="true">
              <Search size={18} />
            </div>
            <span className={styles.workflowStepText}>
              2. Analyze your skills and experience
            </span>
          </div>

          <div className={styles.workflowStepCard}>
            <div className={styles.workflowStepIconWrapper} aria-hidden="true">
              <TrendingUp size={18} />
            </div>
            <span className={styles.workflowStepText}>
              3. Compare with industry standards
            </span>
          </div>

          <div className={styles.workflowStepCard}>
            <div className={styles.workflowStepIconWrapper} aria-hidden="true">
              <Sparkles size={18} />
            </div>
            <span className={styles.workflowStepText}>
              4. Get personalized suggestions & score
            </span>
          </div>
        </div>

        {/* Primary CTA Button */}
        <div className={styles.ctaArea}>
          <button
            type="button"
            className={styles.startAnalysisBtn}
            onClick={handleStartAnalysis}
            disabled={!selectedFile}
            aria-disabled={!selectedFile}
          >
            <span>Start Analysis</span>
            <ArrowRight size={18} aria-hidden="true" />
          </button>

          {!selectedFile && (
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
              Please select or upload a resume to continue.
            </span>
          )}

          <div className={styles.securityNote}>
            <Lock size={13} aria-hidden="true" />
            <span>Your data is safe and secure. We never share your resume.</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResumeWorkspacePage;
