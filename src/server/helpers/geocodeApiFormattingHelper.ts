import * as geocodeTypes from '../typings/googleGeocodeTypes';
import { IResult } from './../typings/googleGeocodeTypes';
import * as geocodeApiHelper from './geocodeApiHelper';

/**
 * Validates if the result corresponds to a valid address.
 */
function validateResult(allowCities = false) {
    const minimumAddressComponentType = allowCities ? 'administrative_area_level_2' : 'route';
    return (r: geocodeTypes.IResult) =>
        r.address_components.filter((c: geocodeTypes.IAddressComponent) => c.types.includes(minimumAddressComponentType)).length > 0;
}

function getFormattedAddress(result: geocodeTypes.IResult): string {
    const addressComponents = [
        geocodeApiHelper.getStreet(result),
        geocodeApiHelper.getStreetNumber(result),
        geocodeApiHelper.getNeighborhood(result),
        geocodeApiHelper.getCity(result),
        geocodeApiHelper.getState(result),
    ].filter((v) => v);
    return addressComponents.join(', ');
}

export function getFormattedLocations(data: geocodeTypes.IGeocodeApiResult, allowCities = false): string[] {
    if (!data || !data.results || !data.results.length) return [];
    return data.results.filter(validateResult(allowCities)).map(getFormattedAddress);
}
