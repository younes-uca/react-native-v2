import React from 'react';
import { View, Text, TextInput, StyleSheet, Switch } from 'react-native';
import { Controller } from 'react-hook-form';
import DatePicker from 'react-native-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS

const CustomInput = ({
                         control,
                         name,
                         placeholder,
                         keyboardT,
                         isBoolean = false,
                         isDate = false,
                         isTextArea = false,
                     }) => {
    if (isBoolean) {
        return (
            <Controller
                control={control}
                render={({ field }) => (
                    <View style={styles.container}>
                        <Text>{placeholder}</Text>
                        <Switch value={field.value} onValueChange={field.onChange} />
                    </View>
                )}
                name={name}
            />
        );
    } else if (isDate) {
        return (
            <Controller
                control={control}
                render={({ field }) => (
                    <View style={styles.container}>
                        <Text>{placeholder}</Text>
                        <DatePicker
                            date={field.value}
                            mode="date"
                            placeholder={placeholder}
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={(date) => field.onChange(date)}
                        />
                    </View>
                )}
                name={name}
            />
        );
    } else if (isTextArea) {
        return (
            <Controller
                control={control}
                render={({ field }) => (
                    <View style={styles.container}>
                        <TextInput
                            placeholder={placeholder}
                            value={field.value}
                            onChangeText={field.onChange}
                            multiline={true}
                            style={[styles.input]}
                            keyboardType={keyboardT}
                        />
                    </View>
                )}
                name={name}
            />
        );
    } else {
        return (
            <Controller
                control={control}
                rules={{ required: 'This field is required' }}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <View
                            style={[
                                styles.container,
                                { borderColor: error ? 'red' : '#e8e8e8' },
                            ]}
                        >
                            <TextInput
                                placeholder={placeholder}
                                value={field.value === null ? '' : String(field.value)}
                                onChangeText={field.onChange}
                                style={[
                                    styles.input,
                                    error && { borderColor: 'red' },
                                ]}
                                keyboardType={keyboardT}
                            />
                        </View>
                        {error && (
                            <Text style={{ color: 'red', alignSelf: 'stretch' }}>
                                {'Required'}
                            </Text>
                        )}
                    </>
                )}
                name={name}
            />
        );
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 7,
        paddingHorizontal: 15,
        marginTop: 15,
    },
    input: {
        height: 50,
    },
});

export default CustomInput;
