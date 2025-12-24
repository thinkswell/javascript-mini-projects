# Calculator App 

A simple interactive **Calculator App** built using **HTML, CSS and JavaScript**. 

---

### ✅ Input Validation & Error Handling Improvements

### 1. Division by Zero Handling
- Added explicit checks to prevent division by zero.
- When a division by zero is detected, the calculator displays **"Error"** instead of returning `Infinity`.
- The calculator safely stops further calculation until cleared.

---

### 2. Prevention of Consecutive Operators
- Restricted users from entering multiple operators consecutively (e.g. `5 ++ 3`).
- If an operator is entered after another operator, the previous operator is automatically replaced.
- Ensures valid mathematical expressions at all times.

---

### 3. Decimal Point Validation
- Prevented multiple decimal points within a single number (e.g. `3.1.4`).
- The calculator now checks the current number segment before allowing a decimal.
- Eliminates parsing and calculation errors.

---

### ⌨️ Keyboard Support Added

The calculator now supports full keyboard input:

- **Numbers:** `0–9`
- **Operators:** `+  -  *  /`
- **Decimal:** `.`
- **Enter / =** → Calculate result
- **Backspace** → Delete last character
- **Escape (Esc)** → Clear input

Keyboard operators `*` and `/` are internally mapped to `×` and `÷`.

---


