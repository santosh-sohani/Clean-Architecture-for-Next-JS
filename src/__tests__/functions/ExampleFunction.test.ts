import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { ExampleFunction } from '@/functions/ExampleFunction'

describe('ExampleFunction', () => {
    test('Should be a function',()=>{
        expect(typeof ExampleFunction).toBe('function')
    })

    test('Should return an object with username, email, and isActive fields', () => {
        const inputUser = {
          username: 'johndoe',
          email: 'john.doe@example.com',
        };
    
        const result = ExampleFunction(inputUser);
    
        expect(result).toHaveProperty('username');
        expect(result).toHaveProperty('email');
        expect(result).toHaveProperty('isActive');
      });

    test('Should add isActive field with true value to the user object', () => {
        const inputUser = {
          username: 'johndoe',
          email: 'john.doe@example.com',
        };
    
        const result = ExampleFunction(inputUser);
    
        // Check the original fields
        expect(result.username).toBe(inputUser.username);
        expect(result.email).toBe(inputUser.email);
    
        // Check the added field
        expect(result.isActive).toBe(true);
      });

})