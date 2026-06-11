import React, { useState, useRef } from 'react';
import { getFS, writeFile } from '../utils/vfs';
import { FileText, FileOutput, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const PdfApp = () => {
  const [filename, setFilename] = useState('untitled.pdf');
  const [status, setStatus] = useState('');
  const editorRef = useRef(null);

  const formatDoc = (cmd, value = null) => {
    document.execCommand(cmd, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const exportToPdf = async () => {
    if (!editorRef.current) return;
    
    setStatus('Exporting...');
    
    try {
      const element = editorRef.current;
      
      const opt = {
        margin:       1,
        filename:     filename,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      // Generate PDF as base64 string
      const pdfBase64 = await html2pdf().set(opt).from(element).outputPdf('datauristring');
      
      // Save to VFS Documents folder
      writeFile(['Documents'], filename, pdfBase64);
      
      setStatus('Saved to Documents!');
      setTimeout(() => setStatus(''), 3000);
    } catch (e) {
      console.error(e);
      setStatus('Export failed!');
    }
  };

  const ToolbarButton = ({ icon: Icon, cmd, arg }) => (
    <button 
      onClick={() => formatDoc(cmd, arg)}
      style={{ 
        background: 'transparent', border: '1px solid transparent', color: 'white', 
        padding: '6px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' 
      }}
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
    >
      <Icon size={16} />
    </button>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--glass-bg)', color: 'var(--text-primary)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid var(--glass-border)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
          <FileText size={18} color="#ef4444" />
          <input 
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            style={{ background: 'transparent', border: '1px solid transparent', color: 'white', padding: '4px', borderRadius: '4px', outline: 'none', width: '150px' }}
            onFocus={(e) => e.target.style.border = '1px solid var(--primary)'}
            onBlur={(e) => e.target.style.border = '1px solid transparent'}
          />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {status && <span style={{ color: '#22c55e', fontSize: '12px' }}>{status}</span>}
          
          <button 
            onClick={exportToPdf}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#ef4444', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 500 }}
          >
            <FileOutput size={14} /> Export PDF
          </button>
        </div>
      </div>

      {/* Real Rich Text Toolbar */}
      <div style={{ display: 'flex', gap: '4px', padding: '8px 16px', borderBottom: '1px solid var(--glass-border)', backgroundColor: 'rgba(0,0,0,0.2)', flexWrap: 'wrap' }}>
        <select 
          onChange={(e) => formatDoc('fontName', e.target.value)}
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '4px 8px', borderRadius: '4px', outline: 'none' }}
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier</option>
          <option value="Georgia">Georgia</option>
        </select>
        
        <select 
          onChange={(e) => formatDoc('fontSize', e.target.value)}
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '4px 8px', borderRadius: '4px', outline: 'none' }}
        >
          <option value="3">Normal</option>
          <option value="1">Small</option>
          <option value="5">Large</option>
          <option value="7">Huge</option>
        </select>
        
        <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--glass-border)', margin: '0 8px' }} />
        
        <ToolbarButton icon={Bold} cmd="bold" />
        <ToolbarButton icon={Italic} cmd="italic" />
        <ToolbarButton icon={Underline} cmd="underline" />
        
        <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--glass-border)', margin: '0 8px' }} />
        
        <ToolbarButton icon={AlignLeft} cmd="justifyLeft" />
        <ToolbarButton icon={AlignCenter} cmd="justifyCenter" />
        <ToolbarButton icon={AlignRight} cmd="justifyRight" />
        
        <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--glass-border)', margin: '0 8px' }} />
        
        <button onClick={() => formatDoc('insertUnorderedList')} style={{ background: 'transparent', border: 'none', color: 'white', padding: '6px', cursor: 'pointer' }}>• List</button>
      </div>

      {/* Real ContentEditable Editor */}
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', justifyContent: 'center', backgroundColor: '#1e293b' }}>
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          style={{
            width: '100%',
            maxWidth: '800px',
            minHeight: '100%',
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid #ccc',
            padding: '40px',
            outline: 'none',
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
            lineHeight: '1.6',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}
        >
          <h2>My Document</h2>
          <p>Start writing here. You can make text <b>bold</b>, <i>italic</i>, or <u>underlined</u> using the toolbar above!</p>
        </div>
      </div>
    </div>
  );
};

export default PdfApp;
