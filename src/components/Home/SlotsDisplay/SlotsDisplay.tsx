import { SlotWithId } from "../../../types";
import { Box } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridSelectionModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store/store";
import { formatDate } from "../../../helpers/date";
import {
  slotSelected,
  updateAvailableSlotsWithLocationToEmpty,
} from "../../../store/reducers/slots";
import { useEffect } from "react";

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
    valueGetter: (params: GridValueGetterParams) => formatDate(params.row.date),
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

const SlotsDisplay = () => {
  const dispatch = useAppDispatch();
  const {
    slots: { selectedSlot, availableSlots },
    filters,
  } = useSelector((state: RootState) => state);
  const selectedRowIds = selectedSlot === undefined ? [] : [selectedSlot.id];
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
    if (rowIds.length >= 2) {
      return;
    }

    let slotChecked = undefined;
    if (rowIds.length === 1) {
      slotChecked = data.find(
        (slotWithId) => slotWithId.id === rowIds[0]
      ) as SlotWithId;
    }

    dispatch(slotSelected(slotChecked));
  };

  useEffect(() => {
    dispatch(updateAvailableSlotsWithLocationToEmpty());
  }, [filters, dispatch]);

  return (
    <Box sx={{ margin: "15px", height: "80vh" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={20}
        checkboxSelection
        hideFooterSelectedRowCount={true}
        selectionModel={selectedRowIds}
        onSelectionModelChange={handleSelectedRowChange}
      />
    </Box>
  );
};

export default SlotsDisplay;
