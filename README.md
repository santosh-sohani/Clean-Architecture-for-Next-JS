# Folder Structure

- *src* : This folder contains all the code required for the application.
- *app* : Contains all the routes required for the application, The name of the folder acts as the route.
- *lib* : Contains all the state management files & folders
- *presentation* : Contains all the necessary components
- *domain* : contains `entities` folder, where each and every entities (interface) required in the application is defined.
- *infrastructure* : contains a folder called as `repository` where logic for any implementation is written.
- *application* : application layer contains a folder called as `hooks` where necessary user defined hooks can be defined and used, wherever required.

# How a component should be defined

- Create a separate folder for each component, inside the `presentation` layer
- Make 3 files 
  1. Component-Name.tsx
  2. ComponentName_Styles.ts
  3. ComponentName_Entities.ts (if required)

Example : 
	 
```tsx
// Button.tsx
import React from 'react'
import { ButtonStyle } from './ButtonStyle'
import { ButtonProps } from './ButtonEntity'

const Button: React.FC<ButtonProps> = ({ config }) => {
  return (
    <button className={ButtonStyle.primary} onClick={config.onClick}>
        {config.label}
    </button>
  )
}
```

```ts
// Entity
// ButtonEntity.ts
interface ButtonEntity {
    label: string,
    onClick?: () => void
}

export interface ButtonProps {
    config: ButtonEntity
}

  
export const buttonConfig: ButtonEntity = {
    label: "Primary Button",
    onClick: () => console.log("clicked")
}
```

```ts
// ButtonStyle.ts
export const ButtonStyle = {
    "primary": 'bg-blue-500 text-white font-bold text-base py-2 px-4',
    "secondary": 'bg-white text-blue-500 border border-blue-500 font-bold',
}
```


# State Management using Redux Toolkit

- Inside of a `lib` folder create a folder named `store`
- Inside of the store folder create a `store.ts` file and two folders
  1. features
  2. hooks

- Inside of the `store.ts` file configure the store and reducers in the format given below.

```ts
// lib/store/store.ts

import { configureStore } from '@reduxjs/toolkit'
import tableDataReducer from './features/TableSlice/TableApiSlice'
import userReducer from './features/UserSlice/UserSlice'
import paramsReducer from './features/TableSlice/TableParamSlice'

// Configure Various Reducers
export const createStore = () => {
    return configureStore({
        reducer: {
          tableData: tableDataReducer,  // Reducers
          user: userReducer,
          paramsReducer: paramsReducer
        }
    })
}

// Default Code
export type AppStore = ReturnType<typeof createStore
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
```

- In the `hooks` folder create `index.ts` file to have various hooks used to dispatch and select

```ts
import { useDispatch, useSelector, useStore } from 'react-redux'
import type { AppDispatch, AppStore, RootState } from '../store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()
```

- Inside the `features` folder create separate folder for a particular slice

```ts
// lib/store/features/UserSlice/UserSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  sub: string | null;
}

const initialState: UserState = {
  sub: null,
};

  
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserSub: (state, action: PayloadAction<string>) => {
      state.sub = action.payload;
    },
  },
});

export const { setUserSub } = userSlice.actions;
export default userSlice.reducer;
```

- Lastly create a `Provider` as a client component and then wrap it to the root layout

```ts
'use client'

import React, { ReactNode, useRef } from 'react'
import { Provider } from 'react-redux'
import { createStore, AppStore } from '../lib/store/store'

const StoreProvider = ({children}:{children:ReactNode}) => {

    const storeRef = useRef<AppStore>()
    
    if (!storeRef.current) {
      storeRef.current = createStore()
    }

    return <Provider store={storeRef.current}>{children}</Provider>

}

export default StoreProvider
```

- Root Layout File

```Html
   <StoreProvider>
      <body className={inter.className}>
          <>{children}</>
      </body>
   </StoreProvider>
```


# API Call

For API calling mainly 3 Folders are used
1. domain 
2. infrastructure 
3. application 

## API calling without Params

### Domain Layer

- *Domain* : In the Domain layer the blueprint for the API, The structure of the API is defined here (Client Side).
- use the naming convention as `user.model.ts`

```ts
export interface userDetailsModel {
    id: number
    name: string
    username: string
    email: string
    address: {
        street: string
        suite: string
        city: string
        zipcode: string
        geo: {
            lat: string
            lng: string
        }
    }
    phone: string
    website: string
    company: {
        name: string
        catchPhrase: string
        bs: string
    }
}
```

### Infrastructure Layer

- *infrastructure* : In the infrastructure Layer the actual API call is made using a function and return here.
- use the naming convention as `user.api.ts`

```typescript
import axios from "axios";
import { userDetailsModel } from "@/domain/models/user.model";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const fecthUsersFromApi = async (): Promise<userDetailsModel[]> => {
   try {
    const response = await axios.get<userDetailsModel[]>(`${BASE_URL}/users`);
    return response.data;
   } catch (error) {
     throw new Error("Failed to fetch users");
   }
}
```

### Application Layer

- *application* : In the `usecase` folder of application name the file using prefix `get` and then add your *transformations* if required for the response.

```ts
import { userDetailsModel } from "@/domain/models/user.model";
import {fecthUsersFromApi} from "@/infrastructure/api/user.api";

export const getUsers = async (): Promise<userDetailsModel[]> => {
    // Transform your data if needed
    return await fecthUsersFromApi();
}
```

### Component Layer

- *Component Level* : Make use of `useEffect` hook to get the data from the function present in the application layer

```ts
import React, { useState, useEffect } from 'react';
import { userDetailsModel } from '@/domain/models/user.model';
import { getUsers } from '@/applications/usecase/getUsers';

// Skeleton Loader
import ContentLoader from 'react-content-loader';

const CardPage = () => {
  const [users, setUsers] = useState<userDetailsModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
          try {
            const fetchedUsers = await getUsers();
            setUsers(fetchedUsers);
          } catch (error) {
            setError('Failed to fetch users');
          } finally {
            setLoading(false);
          }
    };
    
    fetchData(
  },[])

  return (
    <>
      <div className='flex flex-wrap p-4 gap-4'>
        {loading ? (
          <ContentLoader>
            <rect x='0' y='0' rx='5' ry='5' width='300' height='200' />
          </ContentLoader>
        ) : error ? (
          <p>{error}</p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className='border border-gray-300 bg-blue-100 rounded-md shadow-sm p-3 w-full md:w-1/3 lg:w-1/4 text-gray-700'
            >
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}
export default CardPage;
```

## API Calling with Params

### Domain Layer
```ts
export interface userDetailsModel {
    id: number
    name: string
    username: string
    email: string
    address: {
        street: string
        suite: string
        city: string
        zipcode: string
        geo: {
            lat: string
            lng: string
        }
    }
    phone: string
    website: string
    company: {
        name: string
        catchPhrase: string
        bs: string
    }
}
```

### Infrastructure Layer

```ts
import axios from "axios";
import { userDetailsModel } from "@/domain/models/user.model";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchUserFromApiWithParams = async (id: number): Promise<userDetailsModel[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/users/?id=${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch user with id: ${id}`);
  }
}
```

### Application Layer

```ts
import { userDetailsModel } from "@/domain/models/user.model";
import { fetchUserFromApiWithParams } from "@/infrastructure/api/userParams.api";
  
export const getUserWithParam = async (id:number):Promise<userDetailsModel[]> => {
    return await fetchUserFromApiWithParams(id)
}
```

### Component Layer

```ts
"use client";
import React, { useState, useEffect } from 'react';
import { userDetailsModel } from '@/domain/models/user.model';
import { getUserWithParam } from '@/applications/usecase/getUsersWithParam';
import ContentLoader from 'react-content-loader';

const UserPage = () => {
  const [user, setUser] = useState<userDetailsModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedUser = await getUserWithParam(1);
        setUser(fetchedUser);
      } catch (error) {
        setError('Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <div className='flex flex-wrap p-4 gap-4'
      {loading ? (
        <ContentLoader
          backgroundColor='#f3f3f3'
          foregroundColor='#ecebeb'
        >
          <rect x='0' y='0' rx='5' ry='5' width='300' height='200' />
        </ContentLoader>
      ) : error ? (
        <p>{error}</p>
      ) : (
        user.map((user,index) => (
            <div
              key={index}
              className='border border-gray-300 bg-blue-100 rounded-md shadow-sm p-3 w-full md:w-1/3 lg:w-1/4 text-gray-700'
            >
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          ))
      )}
    </div>
  );
}

export default UserPage;
```

# Testing

## Installation and Setup

```bash
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
```

```bash
npm init jest@latest
```

- Copy the below contents in the `jest.config.ts`

```ts
import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
```

```bash
 npm i --save-dev @types/jest
```

- Create a folder called as `__tests__` in the `src` folder
- In the `__tests__` folder create 2 Folders
	  1. api
	  2. components

- In the `api` folder again create 3 folders
	  1. domain
	  2. application
	  3. infrastructure

- For each component to test create a separate folder in the `component` folder


```bash
npm test
```

## Testing at component level

- Assume this is the component required for testing

```ts
import React from 'react'

const TestComponent = () => {
  return (
    <div>
        <h1>Hello World</h1>
        <p>Paragarph For Testing Component</p>
    </div>
  )
}

export default TestComponent
```

- Inside the `__tests__` folder under `components` folder create a new folder by the component name - `TestComponent` 
- Inside the `TestComponent` folder create a `TestComponent.test.tsx` file
- Follow the `ComponentName.test.tsx` naming convention

```ts
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import TestComponent from '@/presentation/components/TestComponent/TestComponent'

describe('TestComponent', () => {
  it('renders a heading', () => {
    render(<TestComponent />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('Contains Text Hello World', () => {
    render(<TestComponent />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Hello World')
  })

  it('Contains Text Paragarph For Testing Component', () => {
    render(<TestComponent />)
    const paragraph = screen.getByText('Paragarph For Testing Component')
    expect(paragraph).toBeInTheDocument()
  })
})
```

- Write the test-cases in the above format

```bash
npm test
```

- Run the above command to execute the test cases.


- Update the `package.json` file script object

```json
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:watch:coverage": "jest --watch --coverage"
```


```bash
npm run test:watch:coverage
```

- Run the above command for code coverage as well.
- Refer the `components` folder under `presenttation` and `__tests__` layers for more scenarios on component testing