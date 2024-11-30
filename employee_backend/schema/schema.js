const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLBoolean,
} = require("graphql");

const dateScalar = require("../scalars/date");
const Employee = require("../models/EmployeeModel");

const EmployeeType = new GraphQLObjectType({
    name: "Employee",
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        age: { type: GraphQLInt },
        dateofJoining: { type: dateScalar },
        title: { type: GraphQLString },
        department: { type: GraphQLString },
        employeeType: { type: GraphQLString },
        currentStatus: { type: GraphQLBoolean },
    }),
});


const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        employee: {
            type: EmployeeType,
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => {
                return Employee.findById(args.id);
            },
        },
        employees: {
            type: new GraphQLList(EmployeeType),
            resolve: () => {
                return Employee.find();
            },
        },
    },
});



const mutations = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addEmployee: {
            type: EmployeeType,
            args: {
                firstName: { type: GraphQLNonNull(GraphQLString) },
                lastName: { type: GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLNonNull(GraphQLInt) },
                dateofJoining: { type: GraphQLNonNull(dateScalar) },
                title: { type: GraphQLNonNull(GraphQLString) },
                department: { type: GraphQLNonNull(GraphQLString) },
                employeeType: { type: GraphQLNonNull(GraphQLString) },
                currentStatus: { type: GraphQLNonNull(GraphQLBoolean) },
            },
            resolve: (parent, args) => {
                const newEmployee = new Employee({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    age: args.age,
                    dateofJoining: args.dateofJoining,
                    title: args.title,
                    department: args.department,
                    employeeType: args.employeeType,
                    currentStatus: args.currentStatus,
                });
                return newEmployee.save();
            },
        },
        filterEmployee: {
            type: new GraphQLList(EmployeeType),
            args: {
                firstName: { type: GraphQLString },
                employeeType: { type: GraphQLString },
            },
            resolve: (parent, args) => {
                if (args.firstName === "" && args.employeeType !== "") {
                    return Employee.find({
                        employeeType: args.employeeType,
                    });
                } else if (args.firstName !== "" && args.employeeType === "") {
                    return Employee.find({ firstName: args.firstName });
                } else if (args.employeeType !== "" && args.firstName !== "") {
                    return Employee.find({
                        employeeType: args.employeeType,
                        firstName: args.firstName,
                    });
                } else {
                    return Employee.find();
                }
            },
        },
        updateEmployee: {
            type: EmployeeType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                firstName: { type: GraphQLNonNull(GraphQLString) },
                lastName: { type: GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLNonNull(GraphQLInt) },
                dateofJoining: { type: GraphQLNonNull(dateScalar) },
                title: { type: GraphQLNonNull(GraphQLString) },
                department: { type: GraphQLNonNull(GraphQLString) },
                employeeType: { type: GraphQLNonNull(GraphQLString) },
                currentStatus: { type: GraphQLNonNull(GraphQLBoolean) },
            },
            resolve: (parent, args) => {
                return Employee.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            firstName: args.firstName,
                            lastName: args.lastName,
                            age: args.age,
                            dateofJoining: args.dateofJoining,
                            title: args.title,
                            department: args.department,
                            employeeType: args.employeeType,
                            currentStatus: args.currentStatus
                        },
                    },
                    {
                        new: true,
                    }
                );
            },
        },
        deleteEmployee: {
            type: EmployeeType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve: (parent, args) => {
                return Employee.findByIdAndDelete(args.id);
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutations,
});
