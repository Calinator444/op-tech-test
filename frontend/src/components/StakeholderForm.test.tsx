import { afterAll, describe, expect, it, vi } from "vitest";
import StakeholderForm from "./StakeholderForm";
import { MemoryRouter } from "react-router-dom";
import { render, waitFor, queryByAttribute } from "@testing-library/react";
import { screen } from "@testing-library/react";
import {toast } from 'react-toastify';
import userEvent from '@testing-library/user-event';                                                    

afterAll(() => {
    vi.restoreAllMocks();
});
describe('StakeholerForm', () => {
    it('renders form fields correctly', () => {
        const result = render(
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
    it('displays a success toast on successful submission', async () => {

        const user = userEvent.setup();

        vi.mock('@/services/stakeholderService', () => ({                                               
          getEmailExists: vi.fn(() => Promise.resolve(false)),                                        
          createStakeholder: vi.fn(() => Promise.resolve(undefined)),                                 
        }));

        const toastSpy = vi.spyOn(toast, 'success').mockImplementation(() => "id");
        render(
        <MemoryRouter>
            <StakeholderForm />
        </MemoryRouter>);
        await user.type(screen.getByLabelText('First Name'), 'Test');                                       
        await user.type(screen.getByLabelText('Last Name'), 'User');                                      
        await user.type(screen.getByLabelText('Email'), 'alice@example.com');
        await user.type(screen.getByLabelText('Role'), 'Tester');                                           
        await user.type(screen.getByLabelText('Organisation'), 'Testing Inc');
        const submitButton = screen.getByRole('button');
        submitButton.click();        
        await waitFor(() => {
            expect(toastSpy).toHaveBeenCalledWith("Stakeholder created successfully!");
        });

    });
});