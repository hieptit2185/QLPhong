import React, { useEffect, useState } from 'react'
import DocTitleByStore from '../shared/DocTitleByStore'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Pagination, message, Spin, Modal, Input, Select } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import useDebounce from '../hooks/useDebounce'

const { confirm } = Modal
const { Search } = Input
const { Option } = Select

const Rooms = () => {

    const url = "http://localhost:8800"
    const [loading, setLoading] = useState(false)
    const [rooms, setRooms] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(20)
    const [error, setError] = useState('')
    const [room_number, setRoom_number] = useState('')
    const [kind_of_room, setKind_of_room] = useState('')
    const [bed_type, setBed_type] = useState('')
    const [room_rates, setRoom_rates] = useState("")


    const index0fLast = page * limit
    const index0fFirst = index0fLast - limit
    const sortRate = rate => {
        switch (rate) {
            case 'ASC':
                return rooms.slice(index0fFirst, index0fLast).sort((a, b) => a.room_rates - b.room_rates)
            case 'DESC':
                return rooms.slice(index0fFirst, index0fLast).sort((a, b) => b.room_rates - a.room_rates)
            default:
                return rooms.slice(index0fFirst, index0fLast)
        }
    }
    const currentRooms = sortRate(room_rates)
    const searchDebounce = useDebounce(room_number)

    useEffect(() => {
        _fetchRooms()
    }, [searchDebounce, kind_of_room, bed_type])

    const _handlePageChange = (page, limit) => {
        setLimit(limit)
        setPage(page)
    }

    const showDeleteConfirm = (id, number) => {
        confirm({
            title: `Are you sure delete room ${number}?`,
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',

            onOk() {
                handleDelete(id)
            },
        })
    }

    const _fetchRooms = async () => {

        setLoading(true)
        setError('')

        const payload = {}
        if (room_number !== "") payload.room_number = +room_number
        if (kind_of_room !== "") payload.kind_of_room = kind_of_room
        if (bed_type !== "") payload.bed_type = bed_type

        try {
            const res = await axios({
                method: 'post',
                url: `${url}/api/room`,
                headers: {},
                data: payload
            })
            const { data } = res
            setRooms(data)

            setLoading(false)
        } catch (e) {
            setError(e.message || 'Unknown error.')
        }
    }

    const handleDelete = async (id) => {
        setLoading(true)
        setError('')

        try {
            const res = await axios.delete(`${url}/api/room/${id}`)

            if (!res) return message.error('Delete failed.')
            message.success('Delete room success!!')
            _fetchRooms()

        } catch (e) {
            setError(e.message || 'Unknown error.')
        } finally {
            setLoading(false)
        }
    }

    const numberWithCommas = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    const TypeRoom = type => {
        switch (type) {
            case 'STD' : 
                return 'Phòng standard'
            case 'SUP':
                return 'Phòng superior'
            case 'DLX':
                return 'Phòng deluxe'
            default :
                return 'Phòng suite'
        }
    }

    const TypeBed = type => {
        switch (type) {
            case 'single':
                return 'Single bed'
            case 'double':
                return 'Double bed'
            default:
                return 'Queen bed'
        }
    }

    const changeStatus = status => {
        switch (status) {
            case 'active':
                return <span className='bg-success text-white px-2 py1 rounded '>{status}</span>
            default:
                return <span className='bg-secondary text-white px-2 py1 rounded '>{status}</span>
        }
    }

    const handleSearchChange = e => {
        setRoom_number(e.target.value)
    }

    const handleSelectChange = (setValue, value) => {
        setValue(value)
    }

    if (error) return <i className='text-danger fs-14'>{error}</i>

    return (
        <div className="RoomsPage">
            <DocTitleByStore title="Danh sách phòng" />
            <div className="d-flex justify-content-between align-items-center px-3">
                <h1 className="PageTitle mt-2 mb-2">Danh sách phòng</h1>
                <div className='col-auto ml-3 ml-sm-0 mr-3 mr-lg-0'>
                    <Link to="/new" className="btn btn-primary">Thêm phòng</Link>
                </div>
            </div>
            <div className="filterRooms px-3 row pb-3">
                <div className="filterSearch col-md-3">
                    <label htmlFor="searchNumber" style={{ fontWeight: 'bold',marginBottom: '10px'}}>Số phòng</label>
                    <Search placeholder="Search for number of room" id="searchNumber" value={room_number} onChange={handleSearchChange} allowClear/>
                </div>
                <div className="selectFilter col-md-2 d-flex flex-column">
                    <label htmlFor="searchNumber" style={{ fontWeight: 'bold',marginBottom: '10px' }}>Loại phòng</label>
                    <Select
                        style={{ width: 200 }}
                        placeholder="--Loại phòng--"
                        allowClear
                        onChange={(value) => handleSelectChange(setKind_of_room, value)}
                    >
                        <Option value="STD">Phòng standard</Option>
                        <Option value="SUP">Phòng superior</Option>
                        <Option value="DLX">Phòng deluxe</Option>
                        <Option value="SUT">Phòng suite</Option>
                    </Select>
                </div>
                <div className="selectFilter col-md-2 d-flex flex-column">
                    <label htmlFor="searchNumber" style={{ fontWeight: 'bold',marginBottom: '10px' }}>Loại giường</label>
                    <Select
                        style={{ width: 200 }}
                        placeholder="--Loại Giường--"
                        allowClear
                        onChange={(value) => handleSelectChange(setBed_type, value)}
                    >
                        <Option value="single">Single bed</Option>
                        <Option value="double">Double bed</Option>
                        <Option value="queen">Queen bed</Option>
                    </Select>
                </div>
                <div className="selectFilter col-md-2 d-flex flex-column">
                    <label htmlFor="searchNumber" style={{ fontWeight: 'bold',marginBottom: '10px' }}>Giá phòng</label>
                    <Select
                        style={{ width: 200 }}
                        placeholder="--Giá phòng--"
                        allowClear
                        onChange={(value) => handleSelectChange(setRoom_rates, value)}
                    >
                        <Option value="ASC">Giá tăng dần</Option>
                        <Option value="DESC">Giá giảm dần</Option>
                    </Select>
                </div>
            </div>
            <Spin tip="Loading..." spinning={loading}>
                <div className="SectionInner">
                    {
                        !loading && rooms.length > 0 &&
                        <div className="MoviesTable">
                            <div className="wrapTable">
                                <table className="table">
                                    <thead className="ShippingsTableHead" style={{ background: "#F4F6F8" }}>
                                        <tr>
                                            <th className="text-center">Loại phòng</th>
                                            <th className="text-center">Số phòng</th>
                                            <th className="text-center">Tầng</th>
                                            <th className="text-center">Khu nhà</th>
                                            <th className="text-center">Hướng phòng</th>
                                            <th className="text-center">Diện tích</th>
                                            <th className="text-center">Giường</th>
                                            <th className="text-center">Số người tối đa</th>
                                            <th className="text-center">Hình ảnh</th>
                                            <th className="text-center">Tiện ích</th>
                                            <th className="text-center">Giá phòng</th>
                                            <th className="text-center">Giảm giá</th>
                                            <th className="text-center">Trạng thái</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            rooms.length && currentRooms.map((item, index) => {
                                                return <tr key={index}>
                                                    <td className="text-center">{TypeRoom(item.kind_of_room)}</td>
                                                    <td className="text-center">{item.room_number}</td>
                                                    <td className="text-center">{item.floor}</td>
                                                    <td className="text-center">{item.location}</td>
                                                    <td className="text-center">{!!item.direction && item.direction}</td>
                                                    <td className="text-center">{item.area}m²</td>
                                                    <td className="text-center">{TypeBed(item.bed_type)}</td>
                                                    <td className="text-center">{item.maximum_people}</td>
                                                    <td className="text-center">
                                                        {!!item.imgae && <img src={item.imgae} alt="" width="30" height="30" />}
                                                    </td>
                                                    <td className="text-center">{!!item.utilities && item.utilities.map((i, index) => {
                                                        if (index) return <span>{`${i},`}</span>
                                                    })}</td>
                                                    <td className="text-center">{numberWithCommas(item.room_rates)}</td>
                                                    <td className="text-center">{item.discount}%</td>
                                                    <td className="text-center">{changeStatus(item.status)}</td>
                                                    <td className="text-center">
                                                        {/* <span className="text-primary px-1" style={{ cursor: "pointer" }}>Edit</span>| */}
                                                        <span className="text-danger " onClick={() => showDeleteConfirm(item._id, item.room_number)} style={{ cursor: "pointer" }}>Delete</span>
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="Pagination d-flex justify-content-between">
                                <div></div>
                                <Pagination current={page} total={rooms.length} pageSize={limit} onChange={_handlePageChange}
                                    className='text-right' showSizeChanger pageSizeOptions={['10', '20', '50', '100']}
                                />
                            </div>
                        </div>
                    }
                    {
                        loading && <div>Loading...</div>
                    }

                    {
                        !loading && rooms.length === 0 && <div>No result</div>
                    }


                </div>
            </Spin>
        </div>
    )
}

export default Rooms