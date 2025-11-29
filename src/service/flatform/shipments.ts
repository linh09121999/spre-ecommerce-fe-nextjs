import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type Shipment, ShipmentUpdate, ShipmentItem } from '../../interface/sendData/interfaceFlatform'

export const ReturnAListOfShipments = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        include?: string,
        filter_state_eq?: string,
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.filter_state_eq) params.append("filter[state_eq]", paramsObj?.filter_state_eq);

    return api.get(`/platform/shipments?${decodeURIComponent(params.toString())}`);
}

export const CreateAShipment = (data: { shipment: Shipment }, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.post(`/platform/shipments?${decodeURIComponent(params.toString())}`, data);
}

export const ReturnAShipment = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/platform/shipments/${id}?${decodeURIComponent(params.toString())}`);
}

export const DeleteAShipment = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/shipments/${id}`);
}

export const UpdateAShipment = (data: { shipment: ShipmentUpdate }, id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/shipments/${id}?${decodeURIComponent(params.toString())}`, data);
}

export const AddsItemVariantToAnExistingShipment = (data: { shipment: ShipmentItem }, id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/shipments/${id}/add_item?${decodeURIComponent(params.toString())}`, data);
}

export const AarkShipmentAsReadyToBeShipped = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/shipments/${id}/ready?${decodeURIComponent(params.toString())}`,{});
}

export const RemovesItemWariantFromShipment = (data: { shipment: ShipmentItem }, id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/shipments/${id}/remove_item?${decodeURIComponent(params.toString())}`, data);
}

export const CancelsTheShipment = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/shipments/${id}/cancel?${decodeURIComponent(params.toString())}`,{});
}

export const AarkShipmentAsShipped = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/shipments/${id}/ship?${decodeURIComponent(params.toString())}`,{});
}
export const AovesShipmentBackToPendingState = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/shipments/${id}/pend?${decodeURIComponent(params.toString())}`,{});
}

export const ResumesTheShipment = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/shipments/${id}/resume?${decodeURIComponent(params.toString())}`,{});
}


