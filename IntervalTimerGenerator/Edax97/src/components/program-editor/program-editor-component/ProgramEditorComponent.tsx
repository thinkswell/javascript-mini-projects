import { MdRepeat as RiRepeat } from "react-icons/md";
import "./program-editor-component.scss";
import { MdSave, MdOutlineDeleteForever as MdDelete } from "react-icons/md";
import { StepListEditorContainer } from "../step-editor/step-likst-editor-container/StepListEditorContainer";

interface PropsType {
  programName: string;
  loops: number;
  setProgramName: (programName: string) => void;
  setLoops: (loops: number) => void;
  saveProgram: () => void;
  deleteProgram: () => void;
}

export function ProgramEditorComponent(props: PropsType) {
  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        props.saveProgram();
      }}
    >
      <div className="d-flex align-items-center">
        <input
          id="program-name"
          className="form-control bg-secondary"
          type="text"
          placeholder="Program Name"
          value={props.programName}
          onChange={(e) => props.setProgramName(e.target.value)}
          required
        />
        <RiRepeat className="fs-4 ms-3" />
        <div className="ms-2 me-auto">
          <input
            id="loops-input"
            className="form-control bg-secondary"
            type="number"
            placeholder="Loops"
            value={props.loops}
            onChange={(e) => props.setLoops(+e.target.value)}
          />
        </div>
        <MdDelete
          className="fs-3 ms-3 text-danger"
          role="button"
          aria-label="Delete program"
          onClick={() => props.deleteProgram()}
        />
        <button
          type="submit"
          className="ms-0 ms-lg-2 fs-3 btn"
          aria-label="Save program"
        >
          <MdSave />
        </button>
      </div>
      <StepListEditorContainer />
    </form>
  );
}
