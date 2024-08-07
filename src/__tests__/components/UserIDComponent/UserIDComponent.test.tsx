import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { useAppSelector } from '@/lib/store/hooks'
import UserIDComponent from '@/presentation/components/UserID/UserIDComponent'

// Mock the useAppSelector hook
jest.mock('../../../lib/store/hooks', () => ({
    useAppSelector: jest.fn(),
}));

describe('UserIDComponent', () => {
    test('It should contain a UserID',()=>{
        (useAppSelector as unknown as jest.Mock).mockReturnValue('IK001');
        const { getByText } = render(<UserIDComponent />);
        expect(getByText('UserID : IK001')).toBeInTheDocument();
    })

    test('should display nothing if no user ID is present', () => {
        (useAppSelector as unknown as jest.Mock).mockReturnValue('');
        const { getByText } = render(<UserIDComponent />);  
        expect(getByText('UserID :')).toBeInTheDocument();
      });
})