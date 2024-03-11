import { useState, useEffect } from 'react';

function useDatalistSupported() {
    const [isSupported, setIsSupported] = useState(true); // Assuming supported by default

    useEffect(() => {
        const input = document.createElement('input');
        const supportsDatalist = 'list' in input && !!document.createElement('datalist').options;

        setIsSupported(supportsDatalist);
    }, []);

    return isSupported;
}

export default useDatalistSupported;
