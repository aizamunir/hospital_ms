

const AdminDashboard = () => {

    const NotificationCard = ({ name = "Katie", applicationCount = 16 }) => {
        const styles = {
            card: {
                background: '#4361ee',
                border: 'none',
                borderRadius: '12px',
                padding: '24px',
                maxWidth: '500px',
                width: '100%',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            },
            contentWrapper: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '24px'
            },
            textSection: {
                flex: 1
            },
            title: {
                color: 'white',
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '8px'
            },
            message: {
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '14px',
                marginBottom: '8px',
                lineHeight: '1.4'
            },
            link: {
                color: 'white',
                textDecoration: 'underline',
                fontSize: '14px',
                cursor: 'pointer'
            },
            emptySpace: {
                width: '100px',
                flexShrink: 0
            }
        };
    
        return (
            <div style={styles.card}>
                <div style={styles.contentWrapper}>
                    <div style={styles.textSection}>
                        <h2 style={styles.title}>Hello {name}!</h2>
                        <p style={styles.message}>
                            You have {applicationCount} new applications. It is a lot 
                            of work for today! So let's start 💪
                        </p>
                    </div>
                    <div style={styles.emptySpace} />
                </div>
            </div>
        );
    };


}

export default AdminDashboard;
