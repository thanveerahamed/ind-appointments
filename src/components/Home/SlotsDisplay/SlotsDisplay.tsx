import { AvailableSlotsWithLocation, ValueLabelPair } from "../../../types";
import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { APPOINTMENT_DESKS } from "../../../constants";

interface Props {
  availableSlots: AvailableSlotsWithLocation[];
}

const SlotsDisplay = ({ availableSlots }: Props) => {
  return (
    <Box sx={{ margin: "15px" }}>
      {availableSlots.map((availableSlot) => {
        return (
          <Accordion defaultExpanded={true} key={availableSlot.location}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                {
                  (
                    APPOINTMENT_DESKS.find(
                      (desk) => desk.value === availableSlot.location
                    ) as ValueLabelPair
                  ).label
                }
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {availableSlot.slots.slice(0, 9).map((slot) => {
                return <li key={slot.key}>{JSON.stringify(slot)}</li>;
              })}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default SlotsDisplay;
