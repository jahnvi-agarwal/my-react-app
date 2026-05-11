import React, { useRef } from 'react';
import styles from './AvatarUpload.module.css';

/**
 * AvatarUpload
 * Circular avatar uploader with click-to-upload and image preview.
 *
 * Props:
 *   preview   {string|null} - base64 data URL of the selected image
 *   onChange  {Function}    - called with the base64 string when user picks a file
 */
function AvatarUpload({ preview, onChange }) {
  const inputRef = useRef(null);

  /** Read the file and emit a base64 data URL to parent */
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => onChange(ev.target.result);
    reader.readAsDataURL(file);
  }

  return (
    <div className={styles.row}>
      {/* Circular preview — click to open file dialog */}
      <button
        type="button"
        className={styles.preview}
        onClick={() => inputRef.current.click()}
        aria-label="Upload profile photo"
        style={{ borderStyle: preview ? 'solid' : 'dashed',
                 borderColor: preview ? 'var(--accent)' : undefined }}
      >
        {preview ? (
          <img src={preview} alt="Profile preview" className={styles.img} />
        ) : (
          <UserIcon />
        )}
      </button>

      {/* Info + button */}
      <div className={styles.info}>
        <p className={styles.hint}>Profile photo <span>(optional)</span></p>
        <button
          type="button"
          className={styles.uploadBtn}
          onClick={() => inputRef.current.click()}
        >
          {preview ? 'Change photo' : 'Upload photo'}
        </button>
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
}

function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

export default AvatarUpload;