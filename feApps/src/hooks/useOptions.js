import { useEffect, useState } from "react";
import api from "../services/api";

function useOptions(endpoint, valueKey, labelKey) {

    const [options, setOptions] = useState([]);

    useEffect(() => {

        getData();

    }, []);

    const getData = async () => {

        try {

            const response = await api.get(endpoint);

            const result = response.data.data.map((item) => ({

                value: item[valueKey],

                label: item[labelKey]

            }));

            setOptions(result);

        } catch (error) {

            console.error(error);

        }

    };

    return options;

}

export default useOptions;