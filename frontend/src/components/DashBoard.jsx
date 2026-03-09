import React, { useContext, useState, useEffect } from "react";
import { RiLock2Fill, RiUserLine } from "@remixicon/react";
import { AuthContext } from "../contexts/AuthContext";
import { NotesTable } from "./NotesTable";
import { InputNotes } from "./InputNotes";

export default function DashBoard() {
  const { user, api } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/api/v1/notes/");
        setNotes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotes();
  }, [api]);

  return (
    <div className="flex flex-col items-center py-8">
      <div className="w-[700px]">
        <h2 className="flex items-center gap-2 text-2xl italic my-4">
          @{user?.username}
          {user?.role === "admin" ? (
            <RiLock2Fill className="text-2xl" />
          ) : (
            <RiUserLine className="text-2xl" />
          )}
        </h2>
        <div className="bg-zinc-600 min-h-[600px] p-2 rounded-lg">
          <div className="add-note my-2">
            <InputNotes />
          </div>
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
