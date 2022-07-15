import React, { useEffect, useState } from 'react'
import ReturnPage from '../shared/ReturnPage'
import DocTitleByStore from '../shared/DocTitleByStore'
import { message, Spin, Input, Select, Button } from 'antd'

const { Option } = Select

const CreateRoom = () => {
  const [loading, setLoading] = useState(false)

  return (
    <div className='CreateRoom'>
      <div className="d-flex align-items-center">
        <DocTitleByStore title="Thêm thông tin phòng" />
        <ReturnPage url="/" title="Back" />
        <h1 className="PageTitle mt-2 mb-2">Thêm thông tin phòng</h1>
      </div>
      <div className="SectionInner">
        <form className="addProductForm d-flex flex-wrap">
          <div className="addProductItem">
            <label>Tầng<span className='text-danger'>*</span></label>
            <Select
              style={{ width: 200, marginLeft : "20px" }}
              placeholder="--Số tầng--"
              allowClear
              // onChange={(value) => handleSelectChange(setKind_of_room, value)}
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
              <Option value="10">10</Option>
            </Select>
          </div>
          <div className="addProductItem">
            <label>Title image<span className='text-danger'>*</span></label>
            <Input
              type="file"
              id="imgTitle"
              name="imgTitle"
            // onChange={e => upload(e.target.files[0], setImgTitle)}

            />
          </div>
          <div className="addProductItem">
            <label>Thumbnail image<span className='text-danger'>*</span></label>
            <Input
              type="file"
              id="imgSm"
              name="imgSm"
            // onChange={e => upload(e.target.files[0], setImgSm)}
            />
          </div>
          <div className="addProductItem">
            <label>Title<span className='text-danger'>*</span></label>
            <Input
              type="text"
              placeholder="John Wick"
              name="title"
            // onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Is Series?<span className='text-danger'>*</span></label>
            <Select name="isSeries" id="isSeries"
            //  onChange={handleChange}
            >
              <Select.Option value="false">No</Select.Option>
              <Select.Option value="true">Yes</Select.Option>
            </Select>
          </div>
          <div className="addProductItem">
            <label>Year<span className='text-danger'>*</span></label>
            <Input
              type="text"
              placeholder="Year"
              name="year"
            // onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Genre<span className='text-danger'>*</span></label>
            <Input
              type="text"
              placeholder="Genre"
              name="genre"
            // onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Duration<span className='text-danger'>*</span></label>
            <Input
              type="text"
              placeholder="Duration"
              name="duration"
            // onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Limit<span className='text-danger'>*</span></label>
            <Input
              type="text"
              placeholder="limit"
              name="Limit"
            // onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Description<span className='text-danger'>*</span></label>
            <Input.TextArea
              type="text"
              placeholder="Description"
              name="desc"
            // onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Trailer<span className='text-danger'>*</span></label>
            <Input
              type="file"
              name="trailer"
            // onChange={e => upload(e.target.files[0], setTrailer)}
            />
          </div>
          <div className="addProductItem">
            <label>Video<span className='text-danger'>*</span></label>
            <Input
              type="file"
              name="video"
            // onChange={e => upload(e.target.files[0], setVideo)}
            />
          </div>
          <Button type="primary mx-3"
          //  onClick={handleSubmit}
          >
            Create {loading ? <Spin /> : ''}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CreateRoom