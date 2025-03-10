import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    filterTypeContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    picker: {
        borderRadius: 8,
        paddingHorizontal: 10,
        width: "100%",
        color: '#333',
        backgroundColor: 'white',
    },
    dateContainer: {
        marginBottom: 15,
        width: "48%",
    },
    dateInput: {
        borderRadius: 8,
        padding: 10,
        height: 50,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    quarterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    quarterPickerContainer: {
        flex: 1,
        width: "100%",
    },
    inputBorder: {
        borderRadius: 8,
        backgroundColor: 'white',
    },
    halfYearContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    halfYearPickerContainer: {
        flex: 1,
        marginRight: 10,
    },
    yearContainer: {
        marginBottom: 15,
    },
});

export default styles;
