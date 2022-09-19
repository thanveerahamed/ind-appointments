import {
  AvailableSlotsWithLocation,
  Desk,
  SlotWithId,
} from "../../../types";
import { Box } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridSelectionModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import moment from "moment";

interface Props {
  availableSlots: AvailableSlotsWithLocation[];
  desks: Desk[];
  selectedAppointments: string[];
  onAppointmentSelected: (appointmentIds: string[]) => void;
}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    hide: true,
  },
  {
    field: "date",
    headerName: "Date",
    width: 250,
    sortable: false,
    valueGetter: (params: GridValueGetterParams) =>
      moment(params.row.date).format("dddd, MMMM Do YYYY"),
  },
  {
    field: "startTime",
    headerName: "Start Time",
    width: 150,
    sortable: false,
  },
  {
    field: "endTime",
    headerName: "End Time",
    width: 150,
    sortable: false,
  },
  {
    field: "deskName",
    headerName: "Desk",
    width: 150,
    sortable: false,
  },
];

const sortSlotsAscending = (slot1: SlotWithId, slot2: SlotWithId) => {
  if (new Date(slot1.date) > new Date(slot2.date)) {
    return 1;
  } else if (new Date(slot1.date) < new Date(slot2.date)) {
    return -1;
  }
  return 0;
};

const SlotsDisplay = ({
  availableSlots,
  selectedAppointments,
  onAppointmentSelected,
  desks,
}: Props) => {
  const data = availableSlots
    .reduce((accumulator: SlotWithId[], availableSlotsWithLocation) => {
      const slots = availableSlotsWithLocation.slots.map((slot): SlotWithId => {
        return {
          ...slot,
          id: slot.key,
          deskKey: availableSlotsWithLocation.deskKey,
          deskName: availableSlotsWithLocation.deskName,
        };
      });

      return [...accumulator, ...slots];
    }, [])
    .sort(sortSlotsAscending);

  const handleSelectedRowChange = (rowIds: GridSelectionModel) => {
    if (rowIds.length > 2) {
      return;
    }

    if (selectedAppointments.length === 0) {
      onAppointmentSelected(rowIds as string[]);
    } else {
      onAppointmentSelected(
        rowIds.filter((x) => x !== selectedAppointments[0]) as string[]
      );
    }
  };

  return (
    <Box sx={{ margin: "15px", height: "80vh" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={20}
        checkboxSelection
        hideFooterSelectedRowCount={true}
        selectionModel={selectedAppointments}
        onSelectionModelChange={handleSelectedRowChange}
      />
    </Box>
  );
};

export default SlotsDisplay;
