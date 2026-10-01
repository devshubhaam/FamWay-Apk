import { useCallback, useMemo, useRef, useState } from 'react';

// Small form helper: errors show after blur or first submit; server errors can be pinned to a field.
export function useAuthForm(initial, validate) {
  const formRef = useRef(null);
  const [values, setValues] = useState(initial);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [serverErrors, setServerErrors] = useState({});

  const all = useMemo(() => validate(values), [values, validate]);
  const errors = useMemo(() => {
    const shown = {};
    Object.keys(all).forEach((k) => { if (submitted || touched[k]) shown[k] = all[k]; });
    return { ...shown, ...serverErrors };
  }, [all, touched, submitted, serverErrors]);

  const focusField = (name) => formRef.current?.elements?.[name]?.focus();

  const bind = (name, transform) => ({
    name,
    value: values[name],
    error: errors[name],
    onChange: (e) => {
      const v = transform ? transform(e.target.value) : e.target.value;
      setValues((s) => ({ ...s, [name]: v }));
      setServerErrors((s) => (s[name] ? { ...s, [name]: undefined } : s));
    },
    onBlur: () => setTouched((t) => ({ ...t, [name]: true })),
  });

  // Returns true when valid; otherwise reveals all errors and focuses the first invalid field.
  const check = () => {
    setSubmitted(true);
    const first = Object.keys(all)[0];
    if (first) { focusField(first); return false; }
    return true;
  };

  const setFieldError = useCallback((name, message) => {
    setServerErrors((s) => ({ ...s, [name]: message }));
    focusField(name);
  }, []);

  return { formRef, values, bind, check, setFieldError };
}
