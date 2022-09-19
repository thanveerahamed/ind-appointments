import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {SyntheticEvent, useState} from "react";
import ManualQuery from "./ManualQuery/ManualQuery";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`query-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

const a11yProps = (index: number) => {
    return {
        id: `query-tab-${index}`,
        'aria-controls': `query-tabpanel-${index}`,
    };
}

const Home = () => {
    const [value, setValue] = useState(0);

    const handleTabChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleTabChange} aria-label="query tabs">
                    <Tab label="Manual Query" {...a11yProps(0)} />
                    <Tab label="Timer Query" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <ManualQuery></ManualQuery>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
        </Box>
    );
}

export default Home;