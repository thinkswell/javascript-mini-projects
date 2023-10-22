import { render, screen } from '@testing-library/react'
import App from './App'; 


test("test api", async() => {

    render(<App />);

    const random = screen.getByText(/random/);

    expect(random).toBeTruthy()

    // await expect(
    //     Promis
    // )

})