import React, { useContext, useState, useEffect } from "react";
import { RiLock2Fill } from "@remixicon/react";
import { AuthContext } from "../contexts/AuthContext";
import { NotesTable } from "./NotesTable";

export default function AdminPanel() {
  const { user, api } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/api/v1/admin/notes/");
        setNotes(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotes();
  }, [api]);

  return (
    <div className="flex flex-col items-center py-8">
      <div className="w-[700px]">
        <h2 className="flex items-center gap-2 text-2xl italic my-4">
          @{user?.username}
          <RiLock2Fill className="text-2xl" />
          <span className="text-sm text-zinc-400 not-italic">Admin Panel</span>
        </h2>
        <div className="bg-zinc-600 min-h-[400px] p-2 rounded-lg">
          <NotesTable
            notes={notes}
            onNoteDeleted={(id) =>
              setNotes((prev) => prev.filter((n) => n.id !== id))
            }
          />
        </div>
      </div>
    </div>
  );
}
