import { ActivityIndicator, StyleSheet, View } from "react-native"

export const CustomLoading = () => {
    return (
        <View style={styles.loadingContainer} testID="loading-container">
            <ActivityIndicator size="large" color="#FFFFFF" testID="activity-indicator" />
        </View>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
    },
})