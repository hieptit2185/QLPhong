import React, { useState } from 'react'
import ReturnPage from '../shared/ReturnPage'
import DocTitleByStore from '../shared/DocTitleByStore'
import { v4 } from "uuid"
import axios from 'axios'
import { storage } from "../firebase"
import { useNavigate } from "react-router-dom"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { message, Spin, Input, Select, Button, Checkbox } from 'antd'

const { Option } = Select

const CreateRoom = () => {

	const url = "http://localhost:8800"
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const [loadingImg, setLoadingImg] = useState(false)
	const [floor, setFloor] = useState('')
	const [room_number, setRoom_number] = useState('')
	const [location, setLocation] = useState('')
	const [kind_of_room, setKind_of_room] = useState('')
	const [area, setArea] = useState('')
	const [maximum_people, setMaximum_people] = useState('')
	const [room_rates, setRoom_rates] = useState('')
	const [bed_type, setBed_type] = useState('')
	const [direction, setDirection] = useState('')
	const [discount, setDiscount] = useState('')
	const [imgae, setImgae] = useState('')
	const [utilities, setUtilities] = useState('')
	const [err, setErr] = useState('')
	const [message, setMessage] = useState('')

	const handleSelectChange = (set, value, field) => {
		delete err[field]
		if (field === 'floor') {
			setRoom_number('')
			set(value)
		} else {
			set(value)
		}
	}

	const handleInputChange = (set, value, field) => {
		delete err[field]
		set(value)
	}

	const upload = (field, set) => {

		const imgRef = ref(storage, `images/${field.name + v4()}`)
		uploadBytes(imgRef, field).then((res) => {
			getDownloadURL(res.ref).then(url => {
				setLoadingImg(true)
				setTimeout(() => {
					set(url)
					setLoadingImg(false)
				}, 2000)
			})
		})
	}

	const handleCheckboxChange = event => {
		let newArray = [...utilities, event.target.value]
		if (utilities.includes(event.target.value)) {
			newArray = newArray.filter(i => i !== event.target.value)
		}
		setUtilities(newArray)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		setLoading(true)
		setErr('')

		const errors = {}

		if (floor === "") errors.floor = "Floor must be required"
		if (kind_of_room === "") errors.kind_of_room = "Kind Of Room must be required"
		if (room_number === "") errors.room_number = "Room number must be required"
		if (area === "") errors.area = "Area must be required"
		if (bed_type === "") errors.bed_type = "Bed type must be required"
		if (maximum_people === "") errors.maximum_people = "Maximum People must be required"
		if (room_rates === "") errors.room_rates = "Room rates must be required"
		if (location === "") errors.location = "Location must be required"

		setErr(errors)
		if (Object.keys(errors).length > 0) {
			setLoading(false)
			return
		}

		try {
			const payload = {
				floor: +floor,
				room_number: +room_number,
				location,
				kind_of_room,
				area: +area,
				maximum_people: +maximum_people,
				room_rates: +room_rates,
				bed_type,
				direction,
				discount,
				imgae,
				utilities,
				status: 'active'
			}
			const res = await axios({
				method: 'post',
				url: `${url}/api/room/new`,
				headers: {},
				data: payload
			})
			if (!res.data) return message.error('Unknown error.')

			setLoading(false)
			message.success('Create room success!!')
			navigate("/")

		} catch (e) {
			setMessage(e.message || 'Unknown error.')
		}
	}

	if (message) return <i className='text-danger fs-14'>{message}</i>

	return (
		<div className='CreateRoom'>
			<div className="d-flex align-items-center">
				<DocTitleByStore title="Thêm thông tin phòng" />
				<ReturnPage url="/" title="Back" />
				<h1 className="PageTitle mt-2 mb-2">Thêm thông tin phòng</h1>
			</div>
			<div className="SectionInner">
				<form className="addInfoForm d-flex flex-column">
					<div className="ListInfo px-5 py-4">
						<div className="itemInfo">
							<label>Tầng<span className='text-danger'>*</span></label>
							<Select
								style={{ width: 200, marginLeft: "20px" }}
								placeholder="--Số tầng--"
								allowClear
								value={floor || []}
								onChange={(value) => handleSelectChange(setFloor, +value, 'floor')}
							>
								<Option value="1">1</Option>
								<Option value="2">2</Option>
								<Option value="3">3</Option>
								<Option value="4">4</Option>
								<Option value="5">5</Option>
								<Option value="6">6</Option>
								<Option value="7">7</Option>
								<Option value="8">8</Option>
								<Option value="9">9</Option>
							</Select>
							{err && <span className="text-danger mx-3">{err.floor}</span>}
						</div>
						<div className="itemInfo">
							<label>Số phòng<span className='text-danger'>*</span></label>
							<Select
								style={{ width: 200, marginLeft: "20px" }}
								placeholder="--Số phòng--"
								allowClear
								value={room_number || []}
								disabled={!!floor ? false : true}
								onChange={(value) => handleSelectChange(setRoom_number, +value, 'room_number')}
							>
								<Option value={`${floor}00`}>{`${floor}00`}</Option>
								<Option value={`${floor}01`}>{`${floor}01`}</Option>
								<Option value={`${floor}02`}>{`${floor}02`}</Option>
								<Option value={`${floor}03`}>{`${floor}03`}</Option>
								<Option value={`${floor}04`}>{`${floor}04`}</Option>
								<Option value={`${floor}05`}>{`${floor}05`}</Option>
								<Option value={`${floor}06`}>{`${floor}06`}</Option>
								<Option value={`${floor}07`}>{`${floor}07`}</Option>
								<Option value={`${floor}08`}>{`${floor}08`}</Option>
								<Option value={`${floor}09`}>{`${floor}09`}</Option>
							</Select>
							{err && <span className="text-danger mx-3">{err.room_number}</span>}
						</div>
						<div className="itemInfo">
							<label>Khu nhà<span className='text-danger'>*</span></label>
							<Select
								style={{ width: 200, marginLeft: "20px" }}
								placeholder="--Khu nhà--"
								allowClear
								value={location || []}
								onChange={(value) => handleSelectChange(setLocation, value, 'location')}
							>
								<Option value="A">A</Option>
								<Option value="B">B</Option>
								<Option value="C">C</Option>
							</Select>
							{err && <span className="text-danger mx-3">{err.location}</span>}
						</div>
						<div className="itemInfo">
							<label>Loại phòng<span className='text-danger'>*</span></label>
							<Select
								style={{ width: 200, marginLeft: "20px" }}
								placeholder="--Loại phòng--"
								allowClear
								value={kind_of_room || []}
								onChange={(value) => handleSelectChange(setKind_of_room, value, 'kind_of_room')}
							>
								<Option value="STD">Phòng standard</Option>
								<Option value="SUP">Phòng superior</Option>
								<Option value="DLX">Phòng deluxe</Option>
								<Option value="SUT">Phòng suite</Option>
							</Select>
							{err && <span className="text-danger mx-3">{err.kind_of_room}</span>}
						</div>
						<div className="itemInfo">
							<label>Diện tích(m²)<span className='text-danger'>*</span></label>
							<Input
								placeholder="Diện tích"
								id="searchNumber"
								value={area}
								onChange={(e) => handleInputChange(setArea, +e.target.value, 'area')}
								allowClear
								style={{ width: 200, marginLeft: "20px" }}
							/>
							{err && <span className="text-danger mx-3">{err.area}</span>}
						</div>
						<div className="itemInfo">
							<label>Số người tối đa<span className='text-danger'>*</span></label>
							<Select
								style={{ width: 200, marginLeft: "20px" }}
								placeholder="--Số người tối đa--"
								allowClear
								value={maximum_people || []}
								onChange={(value) => handleSelectChange(setMaximum_people, +value, 'maximum_people')}
							>
								<Option value="1">1</Option>
								<Option value="2">2</Option>
								<Option value="3">3</Option>
								<Option value="4">4</Option>
							</Select>
							{err && <span className="text-danger mx-3">{err.maximum_people}</span>}
						</div>
						<div className="itemInfo">
							<label>Giá phòng(VND)<span className='text-danger'>*</span></label>
							<Input
								placeholder="Giá phòng"
								id="searchNumber"
								allowClear
								value={room_rates || []}
								onChange={(e) => handleInputChange(setRoom_rates, +e.target.value, 'room_rates')}
								style={{ width: 200, marginLeft: "20px" }}
							/>
							{err && <span className="text-danger mx-3">{err.room_rates}</span>}
						</div>
						<div className="itemInfo">
							<label>Loại giường<span className='text-danger'>*</span></label>
							<Select
								style={{ width: 200, marginLeft: "20px" }}
								placeholder="--Loại giường--"
								allowClear
								value={bed_type || []}
								onChange={(value) => handleSelectChange(setBed_type, value, 'bed_type')}
							>
								<Option value="single">Single bed</Option>
								<Option value="double">Double bed</Option>
								<Option value="queen">Queen bed</Option>
							</Select>
							{err && <span className="text-danger mx-3">{err.bed_type}</span>}
						</div>
						<div className="itemInfo">
							<label>Hướng phòng</label>
							<Input
								placeholder="Hướng phòng"
								id="searchNumber"
								allowClear
								value={direction || []}
								onChange={(e) => handleInputChange(setDirection, e.target.value)}
								style={{ width: 200, marginLeft: "20px" }}
							/>
						</div>
						<div className="itemInfo">
							<label>Giảm giá(%)</label>
							<Input
								placeholder="Giảm giá"
								id="searchNumber"
								value={discount || []}
								onChange={(e) => handleInputChange(setDiscount, +e.target.value)}
								allowClear
								style={{ width: 200, marginLeft: "20px" }}
							/>
						</div>
						<div className="itemInfo d-flex align-items-center">
							<label>Hình ảnh</label>
							<input
								type="file"
								name=""
								id="uploadFile"
								style={{ display: 'none' }}
								onChange={e => upload(e.target.files[0], setImgae)}
							/>
							<div className="d-flex">
								<label htmlFor="uploadFile"
									style={{ marginLeft: "20px", background: "#1890ff", borderRadius: "4px", color: "#ffffff", cursor: "pointer", marginRight: "40px" }}
									className="text-center py-2 px-3"
								>
									Upload image
								</label>
								{!loadingImg ? !!imgae && <img src={imgae} alt="" width="40" /> : <Spin />}
							</div>
						</div>
						<div className="itemInfo d-flex">
							<label>Tiện ích</label>
							<div className="listCheck" style={{ marginLeft: "20px" }}>
								<Checkbox value="wifi" onChange={handleCheckboxChange}>Wifi</Checkbox>
								<Checkbox value="điện thoại" onChange={handleCheckboxChange}>Điện thoại</Checkbox>
								<Checkbox value="tủ lạnh" onChange={handleCheckboxChange}>Tủ lạnh</Checkbox>
								<Checkbox value="nước uống" onChange={handleCheckboxChange}>Nước</Checkbox>
								<Checkbox value="bếp" onChange={handleCheckboxChange}>Bếp</Checkbox>

							</div>
						</div>
					</div>
					<div className="btnAction">
						<Button type="primary mx-5 my-4"
							onClick={handleSubmit}
						>
							Save {loading ? <Spin /> : ''}
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default CreateRoom