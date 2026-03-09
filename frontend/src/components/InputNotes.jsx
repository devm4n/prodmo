import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RiAddFill } from "@remixicon/react";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Toast from "./Toast";

export function InputNotes({ onNoteAdded }) {
  const { api } = useContext(AuthContext);
  const [form, setForm] = useState({ title: "", content: "" });
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await api.post("/api/v1/notes/", form);
      onNoteAdded(res.data);
      setForm({ title: "", content: "" });
    } catch (err) {
      const data = err.response?.data;
      const message =
        data?.detail ||
        data?.non_field_errors?.[0] ||
        Object.values(data).flat()[0];
      setError(message);
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <Field orientation="horizontal">
      <Toast message={error} type="error" onClose={() => setError(null)} />
      <Input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        type="text"
        placeholder="Note Title"
      />
      <Input
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        type="text"
        placeholder="Note Content"
      />
      <Button onClick={handleSubmit}>
        <RiAddFill />
        Add
      </Button>
    </Field>
  );
}
