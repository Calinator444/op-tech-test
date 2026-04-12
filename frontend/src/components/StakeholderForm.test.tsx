import { describe, expect, it } from "vitest";
import StakeholderForm from "./StakeholderForm";
import { MemoryRouter } from "react-router-dom";
import { render, waitFor } from "@testing-library/react";
import { screen } from "@testing-library/react";

describe('StakeholderForm', () => {
    it('renders form fields correctly', () => {
        render(
            <MemoryRouter>
                <StakeholderForm />
            </MemoryRouter>
            );
        expect(screen.getByLabelText('Title')).toBeInTheDocument();
        expect(screen.getByLabelText('First Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Role')).toBeInTheDocument();
        expect(screen.getByLabelText('Organisation')).toBeInTheDocument();
    });


    it('shows validation errors for required fields', async ()=>{
        render(
            <MemoryRouter>
                <StakeholderForm />
            </MemoryRouter>);
        const submitButton = screen.getByRole('button');
        submitButton.click();
        await waitFor(() => {
            expect(screen.getByText('First name is required')).toBeInTheDocument();
            expect(screen.getByText('Last name is required')).toBeInTheDocument();
            expect(screen.getByText('Email is required')).toBeInTheDocument();
            expect(screen.getByText("Role is required")).toBeInTheDocument();
            expect(screen.getByText("Organisation is required")).toBeInTheDocument();
        });
        
    })
});