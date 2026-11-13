"use client";
import { useRef, useState } from "react";

/**
 * Small form engine driven by a schema from lib/validation.js.
 *  - validates a field on blur, then live while typing (once it has been touched)
 *  - on submit: marks everything touched, shows all errors, focuses the first bad field
 *  - field(name) / checkbox(name) return props you can spread straight onto the inputs
 */
export default function useForm({ initialValues, schema }) {
  const schemaRef = useRef(schema);
  schemaRef.current = schema; // always use the latest schema (it changes when the role tab changes)

  const valuesRef = useRef(initialValues);
  const touchedRef = useRef({});
  const nodes = useRef({});

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const markTouched = (names) => {
    const next = { ...touchedRef.current };
    names.forEach((n) => (next[n] = true));
    touchedRef.current = next;
    setTouched(next);
  };

  const check = (names, vals) =>
    setErrors((prev) => {
      const out = { ...prev };
      names.forEach((n) => {
        const msg = schemaRef.current.validateField(n, vals);
        if (msg) out[n] = msg;
        else delete out[n];
      });
      return out;
    });

  const setValue = (name, value) => {
    const next = { ...valuesRef.current, [name]: value };
    valuesRef.current = next;
    setValues(next);
    // Fields whose validity depends on this one are re-checked too.
    const related = { password: ["confirmPassword"], email: ["password"] }[name] ?? [];
    check([name, ...related].filter((n) => touchedRef.current[n]), next);
  };

  const setFieldError = (name, message) => {
    markTouched([name]);
    setErrors((p) => ({ ...p, [name]: message }));
    nodes.current[name]?.focus?.();
  };

  const bindRef = (name) => (el) => {
    nodes.current[name] = el;
  };
  const errorOf = (name) => (touched[name] ? errors[name] ?? "" : "");
  const blur = (name) => () => {
    markTouched([name]);
    check([name], valuesRef.current);
  };

  const field = (name) => ({
    name,
    ref: bindRef(name),
    value: values[name] ?? "",
    error: errorOf(name),
    onChange: (e) => setValue(name, e.target.value),
    onBlur: blur(name),
  });

  const checkbox = (name) => ({
    name,
    ref: bindRef(name),
    checked: !!values[name],
    error: errorOf(name),
    onChange: (e) => {
      markTouched([name]);
      setValue(name, e.target.checked);
    },
    onBlur: blur(name),
  });

  const handleSubmit = (onValid) => async (e) => {
    e?.preventDefault();
    if (submitting) return;
    const s = schemaRef.current;
    const vals = valuesRef.current;
    markTouched(s.fields);
    const errs = s.validateAll(vals);
    setErrors(errs);
    const firstBad = s.fields.find((n) => errs[n]);
    if (firstBad) {
      nodes.current[firstBad]?.focus?.();
      return;
    }
    setSubmitting(true);
    try {
      await onValid(vals, { setFieldError });
    } finally {
      setSubmitting(false);
    }
  };

  return { values, submitting, field, checkbox, handleSubmit, setFieldError };
}
