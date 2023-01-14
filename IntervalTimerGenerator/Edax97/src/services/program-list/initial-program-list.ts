import { ProgramListState } from "../../types/program-list/program-list-state.type";

export const initialProgramList: ProgramListState = {
  currentSetId: 0,
  setList: [
    {
      id: 0,
      setName: "Exercise",
      programList: [
        {
          id: 0,
          setId: 0,
          programName: "Mourning Rutine",
          loops: 2,
          stepList: [
            {
              id: 0,
              stepName: "Running",
              stepTime: 600,
              category: "normal",
            },
            {
              id: 1,
              stepName: "Squats",
              stepTime: 300,
              category: "normal",
            },
            {
              id: 2,
              stepName: "Abdominals",
              stepTime: 300,
              category: "normal",
            },
            {
              id: 3,
              stepName: "End of Loop",
              stepTime: 10,
              category: "notify",
            },
          ],
        },
        {
          id: 1,
          setId: 0,
          programName: "Weeekend Rutine",
          loops: 3,
          stepList: [
            {
              id: 0,
              stepName: "Running",
              stepTime: 1200,
              category: "normal",
            },
            {
              id: 1,
              stepName: "Squats",
              stepTime: 600,
              category: "normal",
            },
            {
              id: 2,
              stepName: "Abdominals",
              stepTime: 600,
              category: "normal",
            },
            {
              id: 3,
              stepName: "End of Loop",
              stepTime: 10,
              category: "notify",
            },
          ],
        },
      ],
    },
    {
      id: 1,
      setName: "Study",
      programList: [
        {
          id: 0,
          setId: 1,
          programName: "Homework",
          loops: 1,
          stepList: [
            {
              id: 0,
              stepName: "Science",
              stepTime: 1800,
              category: "normal",
            },
            {
              id: 1,
              stepName: "End of science",
              stepTime: 10,
              category: "notify",
            },
            {
              id: 2,
              stepName: "Math",
              stepTime: 2400,
              category: "normal",
            },
            {
              id: 3,
              stepName: "End of math",
              stepTime: 10,
              category: "notify",
            },
          ],
        },
        {
          id: 1,
          setId: 1,
          programName: "Extracurricular",
          loops: 1,
          stepList: [
            {
              id: 0,
              stepName: "Piano",
              stepTime: 2400,
              category: "normal",
            },
            {
              id: 1,
              stepName: "End of piano",
              stepTime: 600,
              category: "notify",
            },
          ],
        },
      ],
    },
  ],
};
