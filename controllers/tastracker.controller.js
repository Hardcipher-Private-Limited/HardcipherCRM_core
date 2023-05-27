//creat  add task tracker api

const tasktracker_model = require('../models/task.tracker')
//const user = require('../models/user')
const validator = require('express-validator')
const { generate_serial_number } = require('../helper/utility')

exports.add_tasktracker = async (req, res) => {
    try {

        const errors = validator.validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ status: false, message: "validation error", error: errors })
        }

    
        const task_created = new tasktracker_model({
            emp_name: req.body.emp_name,
            empId: req.body.empId,
            task: [req.body.task],
            task_status: req.body.task_status,
            task_priority: req.body.task_priority,
            task_type: req.body.task_type
        })


        let task_saved = await task_created.save()
        res.status(200).json({ status: true, message: "task added", data: task_saved })
    } catch (err) {
        res.status(500).json({ status: false, message: "task not added", error: err.message })
    }


}

exports.update_tasktracker = async (req, res) => {
    try {
        const errors = validator.validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ status: false, message: "validation error", error: errors })
        }

        let task_found = await tasktracker_model.findOne({ taskId: req.params.taskId })
        if (!task_found) {
            return res.status(400).json({ status: false, message: "task not found" })
        }

        task_found.task_name = req.body.task_name
        task_found.task_description = req.body.task_description
        task_found.task_status = req.body.task_status
        task_found.task_priority = req.body.task_priority
        task_found.task_type = req.body.task_type
        task_found.task_start_date = req.body.task_start_date

        await task_found.save()
        res.status(200).json({ status: true, message: "task updated", data: task_found })
    } catch (err) {
        res.status(500).json({ status: false, message: "task not updated", error: err.message })
    }
}

exports.delete_tasktracker = async (req, res) => {
    try {
        let task_found = await tasktracker_model.findOne({ empId: req.params.id })
        if (!task_found) {
            return res.status(400).json({ status: false, message: "task not found" })
        }
        await task_found.remove()
        res.status(200).json({ status: true, message: "task deleted" })
    } catch (err) {
        res.status(500).json({ status: false, message: "task not deleted", error: err.message })
    }
}
exports.get_all_tasktracker = async (req, res) => {
    try {
        let task_found = await tasktracker_model.find()
        if (!task_found) {
            return res.status(400).json({ status: false, message: "task not found" })
        }
        res.status(200).json({ status: true, message: "task found", data: task_found })
    } catch (err) {
        res.status(500).json({ status: false, message: "task not found", error: err.message })
    }
}

exports.get_tasktracker = async (req, res) => {
    try {
        let task_found = await tasktracker_model.findOne({ empId: req.params.empId })
        if (!task_found) {
            return res.status(400).json({ status: false, message: "task not found" })
        }
        res.status(200).json({ status: true, message: "task found", data: task_found })
    } catch (err) {
        res.status(500).json({ status: false, message: "task not found", error: err.message })
    }
}
exports.get_all_tasktracker_by_emp = async (req, res) => {
    try {
        let task_found = await tasktracker_model.find({ empId: req.params.id })
        if (!task_found) {
            return res.status(400).json({ status: false, message: "task not found" })
        }
        res.status(200).json({ status: true, message: "task found", data: task_found })
    } catch (err) {
        res.status(500).json({ status: false, message: "task not found", error: err.message })
    }
}
