import { useState } from "react";
import API from "../../services/api";
import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Item({ id, content }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        padding: 10,
        marginBottom: 10,
        background: "white",
        borderRadius: 8,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: "grab"
      }}
    >
      {content}
    </div>
  );
}

function Column({ id, items, addItem }) {
  const [input, setInput] = useState("");

  return (
    <div style={styles.column}>
      <h3 style={styles.columnTitle}>{id.toUpperCase()}</h3>

      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        {items.map((item) => (
          <Item key={item.id} id={item.id} content={item.content} />
        ))}
      </SortableContext>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add set..."
        style={styles.input}
      />

      <button
        style={styles.addBtn}
        onClick={() => {
          if (!input.trim()) return;
          addItem(id, input);
          setInput("");
        }}
      >
        Add
      </button>
    </div>
  );
}

export default function WorkoutBuilder() {
  const [name, setName] = useState("");

  const [sections, setSections] = useState({
    warmup: [],
    main: [],
    cooldown: []
  });

  const findSection = (id) =>
    Object.keys(sections).find((key) =>
      sections[key].some((i) => i.id === id)
    );

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const source = findSection(active.id);
    const dest = findSection(over.id);

    if (!source || !dest) return;

    if (source === dest) {
      const items = sections[source];
      const oldIndex = items.findIndex(i => i.id === active.id);
      const newIndex = items.findIndex(i => i.id === over.id);

      setSections({
        ...sections,
        [source]: arrayMove(items, oldIndex, newIndex)
      });
    } else {
      const sourceItems = [...sections[source]];
      const destItems = [...sections[dest]];

      const item = sourceItems.find(i => i.id === active.id);

      sourceItems.splice(sourceItems.indexOf(item), 1);
      destItems.splice(destItems.findIndex(i => i.id === over.id), 0, item);

      setSections({
        ...sections,
        [source]: sourceItems,
        [dest]: destItems
      });
    }
  };

  const addItem = (section, text) => {
    setSections({
      ...sections,
      [section]: [
        ...sections[section],
        { id: Date.now().toString(), content: text }
      ]
    });
  };

  const saveWorkout = async () => {
    try {
      if (!name.trim()) {
        return alert("Please enter workout name");
      }

      const format = (arr) =>
        arr.map((i) => ({
          description: i.content,
          distance: 0
        }));

      const payload = {
        name,
        category: "custom",
        level: "coach",
        warmup: format(sections.warmup),
        mainSet: format(sections.main),
        cooldown: format(sections.cooldown)
      };

      await API.post("/training-sets", payload);

      alert("Workout Saved ");

      setName("");
      setSections({
        warmup: [],
        main: [],
        cooldown: []
      });

    } catch (err) {
      console.log(err);
      alert("Error saving workout ");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Workout Builder</h2>

      {}
      <input
        placeholder="Workout Name (e.g. Sprint Builder)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.nameInput}
      />

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div style={styles.row}>
          {["warmup", "main", "cooldown"].map((sec) => (
            <Column
              key={sec}
              id={sec}
              items={sections[sec]}
              addItem={addItem}
            />
          ))}
        </div>
      </DndContext>

      <button style={styles.saveBtn} onClick={saveWorkout}>
        Save Workout
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: 20
  },

  nameInput: {
    padding: 10,
    width: "300px",
    marginBottom: 20,
    borderRadius: 6,
    border: "1px solid #ccc"
  },

  row: {
    display: "flex",
    gap: 20
  },

  column: {
    flex: 1,
    background: "#f8fafc",
    padding: 15,
    borderRadius: 10
  },

  columnTitle: {
    marginBottom: 10
  },

  input: {
    width: "100%",
    padding: 8,
    marginTop: 10,
    borderRadius: 6,
    border: "1px solid #ccc"
  },

  addBtn: {
    marginTop: 10,
    padding: "6px 10px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  },

  saveBtn: {
    marginTop: 20,
    padding: "10px 20px",
    background: "#10b981",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer"
  }
};