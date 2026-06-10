import React, { useEffect } from 'react';

const BsodScreen = () => {
  useEffect(() => {
    // Play an error sound if possible or just log
    console.error("FATAL ERROR: rm -rf triggered system collapse.");
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#000082', // Classic BSOD blue
      color: '#ffffff',
      fontFamily: '"Lucida Console", Monaco, monospace',
      fontSize: '16px',
      padding: '40px 80px',
      zIndex: 999999,
      display: 'flex',
      flexDirection: 'column',
      cursor: 'none'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        color: '#000082',
        display: 'inline-block',
        padding: '2px 8px',
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginBottom: '24px'
      }}>
        alttre.os
      </div>
      
      <p style={{ marginBottom: '24px' }}>
        A fatal exception 0E has occurred at 0028:C0011E36 in UXD VMM(01) +<br/>
        00010E36. The current application will be terminated.
      </p>

      <p style={{ marginBottom: '24px', color: '#fff000' }}>* SYSTEM PANIC: Unauthorized rm -rf command detected.</p>
      
      <p style={{ marginBottom: '24px' }}>
        * Press any key to terminate the current application.<br/>
        * Press CTRL+ALT+DEL again to restart your computer. You will<br/>
          lose any unsaved information in all applications.
      </p>

      <p style={{ textAlign: 'center', marginTop: '40px' }}>
        Press any key to continue _
      </p>
    </div>
  );
};

export default BsodScreen;
