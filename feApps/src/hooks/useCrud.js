import { useEffect, useState } from "react";
import api from "../services/api";

function useCrud(endpoint) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {

        try {

            setLoading(true);

            const response = await api.get(endpoint);

            setData(response.data.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const createData = async (body) => {

        await api.post(endpoint, body);

        getData();

    };

    const updateData = async (id, body) => {

        await api.put(`${endpoint}/${id}`, body);

        getData();

    };

    const deleteData = async (id) => {

        await api.delete(`${endpoint}/${id}`);

        getData();

    };

    return {

        data,

        setData,

        loading,

        getData,

        createData,

        updateData,

        deleteData

    };

}

export default useCrud;