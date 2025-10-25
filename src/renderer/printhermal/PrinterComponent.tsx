import { useState, useEffect } from 'react';
import { PrinterEscPosService } from './PrinterEscPosService';

export default function PrinterComponent() {
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Listen for printer responses
    const unsubscribe = window.electron.ipcRenderer.on('printer-response', (response: any) => {
      setLoading(false);
      if (response.success) {
        setMessage(response.message || 'Print job sent successfully!');
        setMessageType('success');
      } else {
        setMessage(response.error || 'Unknown error occurred');
        setMessageType('error');
      }
      // Clear message after 10 seconds
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 10000);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  function doTestPrinter80() {
    setLoading(true);
    setMessage('Sending print job to 80mm printer...');
    setMessageType('');
    PrinterEscPosService.doTestPrinter80();
  }

  function doTestPrinter58() {
    setLoading(true);
    setMessage('Sending print job to 58mm printer...');
    setMessageType('');
    PrinterEscPosService.doTestPrinter58();
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Thermal Printer Test</h2>
      <h3>App Version: 0.0.1</h3>
      <br />

      {message && (
        <div
          style={{
            padding: '15px',
            marginBottom: '20px',
            borderRadius: '5px',
            backgroundColor:
              messageType === 'error'
                ? '#ffebee'
                : messageType === 'success'
                ? '#e8f5e9'
                : '#e3f2fd',
            border: `2px solid ${
              messageType === 'error'
                ? '#ef5350'
                : messageType === 'success'
                ? '#66bb6a'
                : '#42a5f5'
            }`,
            color: messageType === 'error' ? '#c62828' : messageType === 'success' ? '#2e7d32' : '#1565c0',
            fontWeight: 'bold',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {messageType === 'error' && '❌ Error: '}
          {messageType === 'success' && '✅ Success: '}
          {message}
        </div>
      )}

      <button
        type="button"
        onClick={() => doTestPrinter80()}
        disabled={loading}
        style={{
          padding: '15px 30px',
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? 'Printing...' : 'Test Printer 80mm'}
      </button>
      <br />
      <br />
      <button
        type="button"
        onClick={() => doTestPrinter58()}
        disabled={loading}
        style={{
          padding: '15px 30px',
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? 'Printing...' : 'Test Printer 58mm'}
      </button>
      <br />
    </div>
  );
}
