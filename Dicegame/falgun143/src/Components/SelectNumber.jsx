import React, { useState } from "react";
import styled from "styled-components";
const array = [];
for (let i = 1; i <= 6; i++) {
  array[i] = i;
}
const SelectNumber = ({ Error,  SetError,  SelectedNumber, SetSelectedNumber }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <div style={{display: "flex", justifyContent: "flex-end"}}>
        <p style={{ color: "red", fontSize: "24px" , fontWeight: "Regular" }}>{Error}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "18px" }}>
          {array.map((value, i) => {
            return (
              <Box
                isSelected={value === SelectedNumber}
                key={i}
                onClick={() => {
                  SetSelectedNumber(value);
                  SetError("");

                }}
              >
                {value}
              </Box>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>Select Number</p>
        </div>
      </div>
    </div>
  );
};

export default SelectNumber;

const Box = styled.div`
  width: 72px;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  border: 1px solid black;
  background-color: ${(props) => (props.isSelected ? "black" : "white")};
  color: ${(props) => (!props.isSelected ? "black" : "white")};
`;
