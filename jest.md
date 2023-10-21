###  JEST

//https://engineering.cimri.com/modern-testing-jest-ve-react-testing-library-part1-e9fe517ac845
//https://engineering.cimri.com/modern-testing-jest-ve-react-testing-library-part-2-4e687f20f1c0

- package.json
{
"scripts":
    {
    "test":"jest" 
    }
}


- default => __ tests__ , .spec.js , .test.js 

https://jestjs.io/docs/expect#methods
- toBe(booelan, number, string) , toEqual(array, object) , toBeTruthy , toBeFalsy , not.toEqual() , toContain() , toThrow(function) , toMatch , toBeGreaterThan , toBeUndefined , toHaveProperty

- jest -t keyword => 
- jest --watch working with git
- jest --coverage

- mock
    ```
    import axiosMock from "axios";

    async function getUsers(){
        try{
            const response = await axiosMock.get("/users");
            return response.data.users;
        } catch(e){
            throw new Error("wrong")
        }
    }

    jest.mock("axios")

    const fakeUsers = ["Evren","Ahmet","Blabla"]

    axiosMock.get.mockResolvedValue({ data : {users:fakeUsers}});

    test("gets the users" , async() =>{
        const users = await getUsers();
        expect(users).toEqual(fakeUsers)
    } )


    ```

    Not: Async await yapısını kullanmak için test fonksiyonunuzu async yapmanız gerekir.

    - configuration
    https://jestjs.io/docs/configuration
    
    
    