
import { HashLoader } from 'react-spinners'

export default function Loading() {
    return (
        <div style={{ textAlign: 'center', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
            <HashLoader
                color="rgba(255, 193, 166, 1)"
                cssOverride={{}}
                size={100}
            />
        </div>
    )
}
