function calculateCGPA(grades, credits) {
    if (grades.length !== credits.length) {
        throw new Error("Lengths of grades and credits arrays must be the same");
    }

    let totalCredits = 0;
    let totalGradePoints = 0;

    for (let i = 0; i < grades.length; i++) {
        let grade = grades[i];
        let credit = credits[i];

        if (!Number.isInteger(credit) || credit <= 0) {
            throw new Error(`Invalid credit value at index ${i}`);
        }

        totalCredits += credit;

        switch (grade.toUpperCase()) {
            case 'A+':
                totalGradePoints += 4.0 * credit;
                break;
            case 'A':
                totalGradePoints += 4.0 * credit;
                break;
            case 'A-':
                totalGradePoints += 3.7 * credit;
                break;
            case 'B+':
                totalGradePoints += 3.3 * credit;
                break;
            case 'B':
                totalGradePoints += 3.0 * credit;
                break;
            case 'B-':
                totalGradePoints += 2.7 * credit;
                break;
            case 'C+':
                totalGradePoints += 2.3 * credit;
                break;
            case 'C':
                totalGradePoints += 2.0 * credit;
                break;
            case 'C-':
                totalGradePoints += 1.7 * credit;
                break;
            case 'D':
                totalGradePoints += 1.0 * credit;
                break;
            case 'F':
                totalGradePoints += 0.0 * credit;
                break;
            default:
                throw new Error(`Invalid grade at index ${i}`);
        }
    }

    return totalGradePoints / totalCredits;
}

// Example usage
const grades = ['A', 'B+', 'A-', 'B', 'C'];
const credits = [3, 4, 2, 3, 1];

try {
    const cgpa = calculateCGPA(grades, credits);
    console.log(`Your CGPA is: ${cgpa.toFixed(2)}`);
} catch (error) {
    console.error(error.message);
}
