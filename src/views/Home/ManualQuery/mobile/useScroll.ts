import { useEffect, useState } from 'react';
import { SlotWithId } from '../../../../types';
interface Props {
  pageCount: number;
  appointments: SlotWithId[];
}

interface ReturnState {
  currentPageAppointments: SlotWithId[];
  isLoading: boolean;
  hasMore: boolean;
}

export const useScrollAppointments = ({
  pageCount,
  appointments,
}: Props): ReturnState => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pagedAppointments, setPagedAppointments] = useState<SlotWithId[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const deepCopyData = [...appointments];

    if (pageCount >= appointments.length) {
      setPagedAppointments(deepCopyData);
      setHasMore(false);
    } else {
      setPagedAppointments(deepCopyData.slice(0, pageCount));
      setHasMore(true);
    }
    setLoading(false);
  }, [pageCount, appointments]);

  return {
    currentPageAppointments: pagedAppointments,
    isLoading: loading,
    hasMore,
  };
};
