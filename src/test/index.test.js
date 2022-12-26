import { render, screen  } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import EmployeeDataTable from "../components/EmployeeDataTable/EmployeeDataTable";


describe("Employee Data", () => {
   
    test("Should all labels render properly", () => {
        render(
            <BrowserRouter>
                <EmployeeDataTable />
            </BrowserRouter>
        );
        

        const getEmployeeLabel = screen.getByRole('heading', {
            name: /Employee name/i
        })
        expect(getEmployeeLabel).toBeInTheDocument();
         const actionTypeLable = screen.getByRole('heading', {  name: /action type/i});
         expect(actionTypeLable).toBeInTheDocument();
         const applicationLable = screen.getByRole('heading', {  name: /application type/i});
         expect(applicationLable).toBeInTheDocument();

         const fromDate = screen.getByRole('heading', {  name: /from date/i});
         expect(fromDate).toBeInTheDocument();

         const toDate = screen.getByRole('heading', {  name: /to date/i});
         expect(toDate).toBeInTheDocument();

         const applicationId = screen.getByRole('heading', {  name: /application id/i});
         expect(applicationId).toBeInTheDocument();

         const searchLoggerButton = screen.getByRole('button', {  name: /search logger/i});
         expect(searchLoggerButton).toBeInTheDocument();

    });

    
    test('Should all input render correctely',()=>{
       const {container}= render(
            <BrowserRouter>
                <EmployeeDataTable />
            </BrowserRouter>
        );
        const employeeInput = screen.getByRole('textbox',{
            name:'employeeName',
         });
         expect(employeeInput).toBeInTheDocument();
         const applicationIdInput = screen.getByRole('textbox', {  name: /applicationid/i});
         expect(applicationIdInput).toBeInTheDocument();
         const applicationTypeSelect = screen.getByRole('combobox', {  name: /applicationtypeselect/i});
         expect(applicationTypeSelect).toBeInTheDocument();
         const actionTypeSelect = screen.getByRole('combobox', {  name: /actiontypeselect/i});
         expect(actionTypeSelect).toBeInTheDocument();
         const fromDateSelector = container.querySelector(
            `input[name="fromDate"]`
          );
         expect(fromDateSelector).toBeInTheDocument();
         const toDateSelector = container.querySelector(
            `input[name="toDate"]`
          );
         expect(toDateSelector).toBeInTheDocument();
    })
});
