import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

// Labelled input with inline error. type="password" gets a show/hide toggle; `prefix` renders e.g. "+91".
const Field = forwardRef(function Field({ id, label, error, aside, prefix, type = 'text', className = '', ...input }, ref) {
  const [show, setShow] = useState(false);
  const isPw = type === 'password';
  const props = {
    id, ref, 'aria-invalid': error ? 'true' : undefined, 'aria-describedby': error ? `${id}-err` : undefined,
    type: isPw && show ? 'text' : type, ...input,
  };
  return (
    <div className={`fg-auth-group ${error ? 'is-invalid' : ''} ${className}`}>
      <div className="fg-auth-label-row">
        <label className="fg-auth-label" htmlFor={id}>{label}</label>
        {aside}
      </div>
      {prefix ? (
        <div className="fg-auth-affix"><span className="fg-auth-prefix">{prefix}</span><input {...props} /></div>
      ) : isPw ? (
        <div className="fg-auth-pw">
          <input className="fg-auth-input" {...props} />
          <button type="button" className="fg-auth-eye" onClick={() => setShow((s) => !s)}
            aria-label={show ? 'Hide password' : 'Show password'} aria-pressed={show}>
            {show ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
          </button>
        </div>
      ) : <input className="fg-auth-input" {...props} />}
      {error && <p className="fg-auth-error" id={`${id}-err`}>{error}</p>}
    </div>
  );
});
export default Field;
