import { RiDeleteBin6Line, RiPencilLine } from "@remixicon/react";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function NotesTable({ notes, onNoteDeleted, onNoteUpdated }) {
  const { api, isAdmin } = useContext(AuthContext);
  const [editNote, setEditNote] = useState(null);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/v1/notes/${id}/`);
      onNoteDeleted(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    if (!editNote) return;
    try {
      const res = await api.put(`/api/v1/notes/${editNote.id}/`, {
        title: editNote.title,
        content: editNote.content,
      });
      setEditNote(null);
      onNoteUpdated(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!notes || notes.length === 0) {
    return (
      <p className="text-zinc-400 text-center py-8 italic">
        No notes yet. Add one above!
      </p>
    );
  }

  return (
    <div>
      {notes.map((note) => (
        <div
          key={note.id}
          className="p-3 my-2 rounded-md border border-zinc-500 flex justify-between items-start gap-4"
        >
          {editNote?.id === note.id ? (
            <div className="flex flex-col gap-2 w-full">
              <input
                className="bg-zinc-800 text-white p-2 rounded border border-zinc-600 w-full"
                value={editNote.title}
                onChange={(e) =>
                  setEditNote({ ...editNote, title: e.target.value })
                }
              />
              <textarea
                className="bg-zinc-800 text-white p-2 rounded border border-zinc-600 w-full"
                value={editNote.content}
                onChange={(e) =>
                  setEditNote({ ...editNote, content: e.target.value })
                }
              />
              <div className="flex gap-2">
                <button
                  onClick={handleUpdate}
                  className="px-3 py-1 bg-green-600 hover:bg-green-500 text-white rounded text-sm"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditNote(null)}
                  className="px-3 py-1 bg-zinc-600 hover:bg-zinc-500 text-white rounded text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1">
              <h3 className="text-xl font-bold underline">{note.title}</h3>
              <p className="font-serif p-2 text-zinc-200">{note.content}</p>
              {isAdmin && (
                <p className="text-sm text-gray-500 mt-2">Owner: {note.auth}</p>
              )}
            </div>
          )}

          {editNote?.id !== note.id && (
            <div className="flex gap-2 shrink-0 mt-1">
              <button
                onClick={() => setEditNote(note)}
                className="text-zinc-400 hover:text-yellow-300 transition-colors"
              >
                <RiPencilLine size={18} />
              </button>
              <button
                onClick={() => handleDelete(note.id)}
                className="text-zinc-400 hover:text-red-400 transition-colors"
              >
                <RiDeleteBin6Line size={18} />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
