import { describe, expect, it, vi } from "vitest";
import { formStakeholder } from "./stakeholder";

vi.mock('@/services/stakeholderService', () => ({
  getEmailExists: (_: string) => {
        return Promise.resolve(true);
    },
}));

describe('Stakeholder Form schema', () => {
  it('should validate a valid stakeholder object', async () => {
    const validStakeholder = {
      title: "",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      role: "Developer",
      organisation: "Tech Company",
    };

    const result = await formStakeholder.safeParseAsync(validStakeholder);
    expect(result.data?.title).toBeUndefined();
  });

  it('should not allow empty values for required fields', async () => {
    
        const invalidStakeholder = {
            title: "",
            firstName: "",
            lastName: "",
            email: "",
            role: "",
            organisation: "",
        };
    
        const result = await formStakeholder.safeParseAsync(invalidStakeholder);
        const errorPaths = result.error?.errors.map((error) => error.path.join('.'));
        expect(errorPaths).toContain('firstName');
        expect(errorPaths).toContain('lastName');
        expect(errorPaths).toContain('email');
        expect(errorPaths).toContain('role');
        expect(errorPaths).toContain('organisation');
    });

}); 